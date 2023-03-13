<template>
  <div class="create-post">
    <BlogCapaPrevia v-show="this.$store.state.blogPreviaFoto" />
    <Loading v-show="loading" />
    <div class="container">
      <div :class="{ invisible: !error }" class="err-message">
        <p><span>Erro: </span>{{ this.errorMsg }}</p>
      </div>
      <div class="blog-info">
        <input type="text" placeholder="Escolha Um Título" v-model="blogTitulo" />
        <div class="upload-file">
          <label for="blog-photo">Upload Foto Capa</label>
          <input type="file" ref="blogFoto" id="blog-photo" @change="fileChange" accept=".png, .jpg, ,jpeg" />
          <button @click="abrirPrevia" class="preview" :class="{ 'button-inactive': !this.$store.state.blogArquivoFotoUrl }">
            Previa
          </button>
          <span>Arquivo selecionado: {{ this.$store.state.blogNomeFoto }}</span>
        </div>
      </div>
      <div class="editor">
        <vue-editor :editorOptions="editorSettings" v-model="blogHTML" useCustomImageHandler @image-added="imageHandler" />
      </div>
      <div class="blog-actions">
        <button @click="uploadBlog">Publicar Blog</button>
        <router-link class="router-button" :to="{ name: 'PostPrevia' }">Prévia Post</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import db from '../firebase/firebaseInit'
import Loading from "../components/Loading";
import BlogCapaPrevia from '../components/BlogCapaPrevia'
import Quill from "quill";
import { VueEditor } from "vue2-editor";
window.Quill = Quill;
const ImageResize = require("quill-image-resize-module").default;
Quill.register("modules/imageResize", ImageResize);
export default {
  name: "CreatePost",
  data() {
    return {
      file: null,
      error: null,
      errorMsg: null,
      loading: null,
      editorSettings: {
        modules: {
          imageResize: {},
        },
      },
    };
  },
  components: {
    Loading,
    VueEditor,
    BlogCapaPrevia
  },
  methods: {
    fileChange(){
      this.file = this.$refs.blogFoto.files[0];
      const nomeArquivo = this.file.name;
      this.$store.commit("mudarNomeArquivo", nomeArquivo);
      this.$store.commit("criarArquivoURL", URL.createObjectURL(this.file));
    },
    abrirPrevia(){
      this.$store.commit("abrirFotoPrevia");
    },
    imageHandler(file, Editor, cursorLocation, resetUploader) {
      const storageRef = firebase.storage().ref();
      const docRef = storageRef.child(`documents/blogPostFotos/${file.name}`);
      docRef.put(file).on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
        },
        (err) => {
          console.log(err);
        },
        async () => {
          const downloadURL = await docRef.getDownloadURL();
          Editor.insertEmbed(cursorLocation, "image", downloadURL);
          resetUploader();
        }
      );
    },
    uploadBlog(){
      if (this.blogTitulo.length !== 0 && this.blogHTML.length !== 0) {
        if (this.file) {
          this.loading = true;
          const storageRef = firebase.storage().ref();
          const docRef = storageRef.child(`documents/BlogFotosCapa/${this.$store.state.blogNomeFoto}`);
          docRef.put(this.file).on(
            "state_changed",
            (snapshot) => {
              console.log(snapshot);
            },
            (err) => {
              console.log(err);
              this.loading = false;
            },
            async () => {
              const downloadURL = await docRef.getDownloadURL();
              const timestamp = await Date.now();
              const dataBase = await db.collection("blogPosts").doc();
              await dataBase.set({
                blogID: dataBase.id,
                blogHTML: this.blogHTML,
                blogFotoCapa: downloadURL,
                blogNomeFotoCapa: this.blogNomeFoto,
                blogTitulo: this.blogTitulo,
                perfilId: this.perfilId,
                data: timestamp,
              });
              await this.$store.dispatch("listarPosts");
              this.loading = false;
              this.$router.push({ name: "VerPost", params: { blogId: dataBase.id } });
            }
          );
          return;
        }
        this.error = true;
        this.errorMsg = "Verifique se foi selecionado uma foto de capa";
        setTimeout(() => {
          this.error = false;
        }, 5000);
        return;
      }
      this.error = true;
      this.errorMsg = "Verifique se o título ou conteúdo do blog foi preenchido";
      setTimeout(() => {
        this.error = false;
      }, 5000);
      return;
    }
  },
  computed: {
    perfilId() {
      return this.$store.state.perfilId;
    },
    blogNomeFoto() {
      return this.$store.state.blogNomeFoto;
    },
    blogTitulo: {
      get() {
        return this.$store.state.blogTitulo;
      },
      set(payload) {
        this.$store.commit("updateBlogTitulo", payload);
      },
    },
    blogHTML: {
      get() {
        return this.$store.state.blogHTML;
      },
      set(payload) {
        this.$store.commit("novoBlogPost", payload);
      },
    },
  },
};
</script>

<style lang="scss">
.create-post {
  position: relative;
  height: 100%;
  button {
    margin-top: 0;
  }
  .router-button {
    text-decoration: none;
    color: #fff;
  }
  label,
  button,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;
    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }
  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }
  // error styling
  .invisible {
    opacity: 0 !important;
  }
  .err-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;
    p {
      font-size: 14px;
    }
    span {
      font-weight: 600;
    }
  }
  .blog-info {
    display: flex;
    margin-bottom: 32px;
    input:nth-child(1) {
      min-width: 300px;
    }
    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;
      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }
    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;
      input {
        display: none;
      }
      .preview {
        margin-left: 16px;
        text-transform: initial;
      }
      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
      }
    }
  }
  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;
    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
    }
    .ql-editor {
      padding: 20px 16px 30px;
    }
  }
  .blog-actions {
    margin-top: 32px;
    button {
      margin-right: 16px;
    }
  }
}
</style>