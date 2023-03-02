<template>
  <div class="blog-card-wrapper">
    <div class="blog-cards container">
        <div v-if="admin" class="toggle-edit">
            <span>Modo edição</span>
            <input type="checkbox" v-model="modoEdicao">
        </div>
        <BlogCard :post="post" v-for="(post, index) in blogsCards" :key="index" />
    </div>
  </div>
</template>

<script lang="ts">
import  Vue from 'vue';
import BlogCard from '@/components/BlogCard.vue'
export default Vue.extend( {
    name:"blogs",
    components: {
        BlogCard
    },
    computed:{
        blogsCards(){
            return this.$store.state.blogsCards
        },
        modoEdicao:{
            get(){
                return this.$store.state.modoEdicao;
            },
            set(payload){
                this.$store.commit("alterarModoEdicao", payload);
            }
        },
        admin(){
          return this.$store.state.perfilAdmin;
        }
    },
    beforeDestroy(){
        this.$store.commit("alterarModoEdicao", false);
    }
})
</script>

<style lang="scss" scoped>
.blog-cards {
  position: relative;
  .toggle-edit {
    display: flex;
    align-items: center;
    position: absolute;
    top: -70px;
    right: 0;
    span {
      margin-right: 16px;
    }
    input[type="checkbox"] {
      position: relative;
      border: none;
      -webkit-appearance: none;
      background: #fff;
      outline: none;
      width: 80px;
      height: 30px;
      border-radius: 20px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    input[type="checkbox"]:before {
      content: "";
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 20px;
      top: 0;
      left: 0;
      background: #303030;
      transform: scale(1.1);
      transition: 750ms ease all;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    input:checked[type="checkbox"]:before {
      background: #fff;
      left: 52px;
    }
  }
}
</style>