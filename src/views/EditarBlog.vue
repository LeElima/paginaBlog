<template>
    <div class="create-post">
    <BlogCapaPrevia v-show="this.$store.state.blogPreviaFoto" />
    <Loading v-show="loading" />
    <div class="container">
      <div :class="{ invisible: !error }" class="err-message">
        <p><span>Erro: </span>{{ this.errorMsg }}</p>
      </div>
      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="blogTitulo" />
        <div class="upload-file">
          <label for="blog-photo">Upload Foto Capa</label>
          <input type="file" ref="blogPhoto" id="blog-photo" @change="fileChange" accept=".png, .jpg, ,jpeg" />
          <button @click="abrirPrevia" class="preview" :class="{ 'button-inactive': !this.$store.state.blogArquivoFotoUrl }">
            Previa
          </button>
          <span>Arquivo selecionado:: {{ this.$store.state.blogNomeFoto }}</span>
        </div>
      </div>
      <div class="editor">
        <vue-editor :editorOptions="editorSettings" v-model="blogHTML" useCustomImageHandler @image-added="imageHandler" />
      </div>
      <div class="blog-actions">
        <button @click="updateBlog">Salvar Modificações</button>
        <router-link class="router-button" :to="{ name: 'PostPrevia' }">Prévia Post</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
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
export default Vue.extend({
    data() {
        return{
            file: null,
            error: null,
            errorMsg: null,
            loading: null,
            routeID: null,
            currentBlog: null,
            editorSettings: {
                modules: {
                imageResize: {},
                },
            },
        }
    },
    components: {
        Loading,
        VueEditor,
        BlogCapaPrevia
    },
    async mounted() {
        this.routeID = this.$route.params.blogId;
        this.currentBlog = await this.$store.state.blogPosts.filter((post) => {
        return post.blogID === this.routeID;
        });
        console.log(this.currentBlog[0])
        this.$store.commit("setBlogState", this.currentBlog[0]);
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
    
    async updateBlog() {
      const dataBase = await db.collection("blogPosts").doc(this.routeID);
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
              await dataBase.update({
                blogHTML: this.blogHTML,
                blogFotoCapa: downloadURL,
                blogNomeFotoCapa: this.blogNomeFoto,
                blogTitulo: this.blogTitulo,
              });
              await this.$store.dispatch("updatePost", this.routeID);
              this.loading = false;
              this.$router.push({ name: "VerPost", params: { blogId: dataBase.id } });
            }
          );
          return;
        }
        this.loading = true;
        await dataBase.update({
          blogHTML: this.blogHTML,
          blogTitulo: this.blogTitulo,
        });
        await this.$store.dispatch("updatePost", this.routeID);
        this.loading = false;
        this.$router.push({ name: "VerPost", params: { blogid: dataBase.id } });
        return;
      }
      this.error = true;
      this.errorMsg = "Verifique se o título ou conteúdo do blog foi preenchido";
      setTimeout(() => {
        this.error = false;
      }, 5000);
      return;
    },
  },
})
</script>
