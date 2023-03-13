<template>
    <div class="post-view" v-if="blogAtual">
    <div class="container quillWrapper">
      <h2>{{ this.blogAtual[0].blogTitulo }}</h2>
      <h4>Postado em: {{ new Date(this.blogAtual[0].blogData).toLocaleString("pt-br", { dateStyle: "long" }) }}</h4>
      <img :src="this.blogAtual[0].blogCardCapa" alt="" />
      <div class="post-content ql-editor" v-html="this.blogAtual[0].blogHTML"></div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'

export default Vue.extend({
    data() {
        return{
            blogAtual: null
        }
    },
    async mounted() {
        this.blogAtual = await this.$store.state.blogPosts.filter((post) => {
        return post.blogID === this.$route.params.blogId;
        });
  },
})
</script>
<style lang="scss">
.post-view {
  h4 {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 24px;
  }
}
</style>
