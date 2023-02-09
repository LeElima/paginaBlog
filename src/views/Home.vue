<template>
  <div>
    <BlogPost :post="telaBemVindo" />
    <BlogPost :post="post" v-for="(post, index) in postBlog" :key="index"/>
  </div>
</template>

<script lang="ts">
import CobAutoComplete from '@/components/CobAutoComplete.vue';
import CobPanel from '@/components/CobPanel.vue';
import Vue from 'vue';
import HelloWorld from '../components/HelloWorld.vue';
import BlogPost from '../components/BlogPost.vue'

export default Vue.extend({
  name: 'Home',

  components: {
    HelloWorld,
    CobPanel,
    CobAutoComplete,
    BlogPost
  },
  data(){
  return{
    telaBemVindo: {
      titulo: "Seja bem-vindo",
      blogPost: "Seja bem-vindo a este site desenvolvido para desenvolver as habilidades de Vue",
      telaBemVindo: true,
      foto: "coding"
    },
    postBlog: [
      {
        titulo: "Isso é um titulo comum",
        blogHtml: "Isso é um teste de blog escrito com um texto relativamente grande para visualizar no sistema ",
        blogFotoCapa: "beautiful-stories"
      },
      {
        titulo: "Isso é um titulo comum",
        blogHtml: "Isso é um teste de blog escrito com um texto relativamente grande para visualizar no sistema.",
        blogFotoCapa: "designed-for-everyone"
      },
    ]
  }
  
},
  
});


</script>
