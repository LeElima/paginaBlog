<template>
  <div>
    <BlogPost v-if="!user" :post="telaBemVindo" />
    <BlogPost :post="post" v-for="(post, index) in blogPostsFeed" :key="index"/>
    <div class="blog-card-wrapper">
      <div class="container">
        <h3>Veja posts mais recentes!</h3>
        <div class="blog-cards">
          <BlogCard :post="post" v-for="(post, index) in blogPostsCards" :key="index" />
        </div>
      </div>
    </div>
    <div v-if="!user" class="updates">
      <div class="container">
        <h2>Não perca as novidades! Registre-se agora!</h2>
        <router-link class="router-button" to="Registrar">Registar <v-icon class="arrow arrow-light">mdi-arrow-right</v-icon></router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CobAutoComplete from '@/components/CobAutoComplete.vue';
import CobPanel from '@/components/CobPanel.vue';
import Vue from 'vue';
import HelloWorld from '../components/HelloWorld.vue';
import BlogPost from '../components/BlogPost.vue'
import BlogCard from '../components/BlogCard.vue'
export default Vue.extend({
  name: 'Home',

  components: {
    HelloWorld,
    CobPanel,
    CobAutoComplete,
    BlogPost,
    BlogCard
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
      ],
      
    }
  
  },
  computed:{
    blogPostsFeed(){
      return this.$store.getters.blogPostsFeed
    },
    blogPostsCards(){
      return this.$store.getters.blogPostsCards
    },
    user(){
        return this.$store.state.user
    }
  }
  
});


</script>
<style lang="scss" scoped>
  .blog-card-wrapper{
    h3{
      font-weight: 300;
      font-size: 28px;
      margin-bottom: 32px;
    }
  }
  .updates{
    .container{
      padding: 100px 25px;
      display: flex;
      flex-direction: column;
      align-items: center;
      @media(min-width: 800px){
        padding: 125px 25px;
        flex-direction: row;
      }

      .router-button{
        display: flex;
        font-size: 14px;
        text-decoration: none;
        @media(min-width: 800px){
          margin-left: auto;
        }
      }

      h2{
        font-weight: 300;
        font-size: 32px;
        max-width: 425px;
        width: 100%;
        text-align: center;
        text-transform: uppercase;
        @media(min-width: 800px){
          text-align: initial;
          font-size: 40px;
        }
      }
    }
  }

</style>
