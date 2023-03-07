<template>
  <div class="post-view">
    <div class="container quillWrapper">
      <h2>{{ this.blogTitulo }}</h2>
      <img :src="blogPreviaFoto" alt="" />
      <div class="post-content ql-editor" v-html="blogHTML"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default  Vue.extend({
    name: "PostPrevia",
    computed: {
        blogTitulo() {
            return this.$store.state.blogTitulo;
        },
        blogHTML() {
            return this.$store.state.blogHTML;
        },
        blogPreviaFoto() {
            return this.$store.state.blogArquivoFotoUrl;
        },
    },
})
</script>

<style lang="scss">
.post-view {
  min-height: 100%;
  .container {
    max-width: 1000px;
    padding: 60px 25px;
  }
  .ql-editor {
    padding: 0;
  }
  h2 {
    margin-bottom: 16px;
    font-weight: 300;
    font-size: 32px;
  }
  img {
    width: 100%;
    margin-bottom: 32px;
  }
}
</style>