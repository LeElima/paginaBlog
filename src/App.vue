<template>
  <v-app v-if="$store.state.postCarregado">
    <!-- <v-app-bar
      app
      color="danger"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
         <v-spacer></v-spacer>
      <v-btn
      :v-text="'Pagina Inicial'"
      text
      >
      <router-link to="/">Pagina Inicial</router-link>
        
      </v-btn>
      <v-btn
      text
      >
       <router-link to="/Cadastro">Cadastro</router-link>
      </v-btn>
      <v-btn
      text
      
      >
      <router-link to="/Sobre">Sobre</router-link>
        
      </v-btn>
      </div>

      <v-spacer></v-spacer>

    </v-app-bar> -->

    <!-- <v-main> -->
      <Navigation v-if="navegacao" />
      <router-view/>
      <FooterVue v-if="navegacao"/>
    <!-- </v-main> -->
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Navigation from './components/Navigation.vue';
import FooterVue from './components/Footer.vue';
import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';
export default Vue.extend({
  name: 'App',
  components :{
    Navigation,
    FooterVue
  },
  data: () => ({
    //
    navegacao: false
  }),
  created(){
    firebase.auth().onAuthStateChanged((user)=>{
      this.$store.commit("updateUser", user)
      if(user){
        this.$store.dispatch("getUsuarioAtual")
        console.log(this.$store.state.perfilEmail)
      }
    })
    this.verificarRota();
    this.$store.dispatch("listarPosts");
  },
  methods:{
    verificarRota(){
      if(this.$route.name == "Login" ||this.$route.name == "Senha"||this.$route.name == "Registrar"){
        this.navegacao = false;
        return;
      }
        this.navegacao = true;
      
    }
  },
  watch:{
    $route(){
      this.verificarRota();
    }
  }
});
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.container {
  max-width: 1440px;
  margin: 0 auto;
}
.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}
.link-light {
  color: #fff;
}
.arrow{
  margin-left: 8px;
  width: 12px;
  path{
    fill: #000;
  }
}
.arrow-light{
  path{
    fill: #fff;
  }
}

button,
.router-button{
  transition: 500ms ease all;
  cursor: pointer;
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #303030;
  color: #fff;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;

  &:focus{
    outline: none;
  }

  &:hover{
    background-color: rgba(48, 48, 48, 0.7)
  }
}

.button-ghost{
  color: #000;
  padding: 0;
  border-radius: 0;
  margin-top: 50px;
  font-size: 15px;
  font-weight: 500;
  background-color: transparent;
  @media(min-width: 700px){
    margin-top: 0;
    margin-left: auto;
  }
  i{
    margin-left: 8px;
  }
}

.button-light{
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
}

.button-inactive{
  pointer-events: none !important;
  cursor: none !important;
  background-color: rgba(128, 128, 128, 0.5) !important;
}

.mensagemErro {
  text-align: center;
  font-size: 12px;
  color: red;
}

.blog-card-wrapper{
  position: relative;
  padding: 80px 16px;
  background-color: #f1f1f1;
  @media(min-width: 500px){
    padding: 100px 16px;
  }

  .blog-cards{
    display: grid;
    gap: 32px;
    grid-template-columns: 1fr;
    @media(min-width: 500px){
      grid-template-columns: repeat(2, 1fr)
    }
    @media(min-width: 900px){
      grid-template-columns: repeat(3, 1fr)
    }
    @media(min-width: 1200px){
      grid-template-columns: repeat(4, 1fr)
    }


  }

}
</style>
