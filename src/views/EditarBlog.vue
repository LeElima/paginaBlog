<template>
    <div class="create-post">
    <BlogCoverPreview v-show="this.$store.state.blogPhotoPreview" />
    <Loading v-show="loading" />
    <div class="container">
      <div :class="{ invisible: !error }" class="err-message">
        <p><span>Error:</span>{{ this.errorMsg }}</p>
      </div>
      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="blogTitle" />
        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input type="file" ref="blogPhoto" id="blog-photo" @change="fileChange" accept=".png, .jpg, ,jpeg" />
          <button @click="openPreview" class="preview" :class="{ 'button-inactive': !this.$store.state.blogPhotoFileURL }">
            Preview Photo
          </button>
          <span>File Chosen: {{ this.$store.state.blogPhotoName }}</span>
        </div>
      </div>
      <div class="editor">
        <vue-editor :editorOptions="editorSettings" v-model="blogHTML" useCustomImageHandler @image-added="imageHandler" />
      </div>
      <div class="blog-actions">
        <button @click="updateBlog">Save Changes</button>
        <router-link class="router-button" :to="{ name: 'BlogPreview' }">Preview Changes</router-link>
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
    this.routeID = this.$route.params.blogid;
    this.currentBlog = await this.$store.state.blogPosts.filter((post) => {
      return post.blogID === this.routeID;
    });
    this.$store.commit("setBlogState", this.currentBlog[0]);
  },
})
</script>
