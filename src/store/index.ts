import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';

import db from '../firebase/firebaseInit'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    blogsCards:[
      {blogTitulo:"Blog Card 1", blogCardCapa:"stock-1", blogData:"30 de Maio de 2022"},
      {blogTitulo:"Blog Card 2", blogCardCapa:"stock-2", blogData:"30 de Maio de 2022"},
      {blogTitulo:"Blog Card 3", blogCardCapa:"stock-3", blogData:"30 de Maio de 2022"},
      {blogTitulo:"Blog Card 4", blogCardCapa:"stock-4", blogData:"30 de Maio de 2022"},
    ],
    blogPosts: [],

    postCarregado: false,
    blogHTML: "Escreva o conteúdo aqui",
    blogTitulo: "",
    blogNomeFoto: "",
    blogArquivoFotoUrl: null,
    blogPreviaFoto: false,
    modoEdicao:null,
    user: null,
    perfilAdmin: null,
    perfilEmail: "",
    perfilNome: "" ,
    perfilSobrenome: "",
    perfilUsuario: "",
    perfilId: "",
    perfilIniciais: "",
  },
  getters: {
    blogPostsFeed(state) {
      return state.blogPosts.slice(0, 2);
    },
    blogPostsCards(state) {
      return state.blogPosts.slice(2, 6);
    },
  },
  mutations: {
    novoBlogPost(state, payload) {
      state.blogHTML = payload;
    },
    updateBlogTitulo(state, payload) {
      state.blogTitulo = payload;
    },
    mudarNomeArquivo(state, payload){
      state.blogNomeFoto = payload;
    },
    criarArquivoURL(state, payload){
      state.blogArquivoFotoUrl = payload;
    },
    abrirFotoPrevia(state){
      state.blogPreviaFoto = !state.blogPreviaFoto;
    },
    filtrarBlogPost(state, payload) {
      state.blogPosts = state.blogPosts.filter((post:any) => post.blogID !== payload);
    },
    alterarModoEdicao(state, payload){
      state.modoEdicao = payload;
    },
    setBlogState(state, payload) {
      state.blogTitulo = payload.blogTitle;
      state.blogHTML = payload.blogHTML;
      state.blogArquivoFotoUrl = payload.blogCoverPhoto;
      state.blogNomeFoto = payload.blogCoverPhotoName;
    },
    updateUser(state, payload) {
      state.user = payload;
    },
    setPerfilInfo(state, doc){
      state.perfilId = doc.id;
      state.perfilEmail = doc.data().email;
      state.perfilNome = doc.data().nome;
      state.perfilSobrenome = doc.data().sobrenome;
      state.perfilUsuario = doc.data().usuario;
      state.perfilAdmin = doc.data().administrador;
    },
    mudarNome(state, payload){
      state.perfilNome = payload;
    },
    mudarSobrenome(state, payload){
      state.perfilSobrenome = payload;
    },
    mudarUsuario(state, payload){
      state.perfilUsuario = payload;
    },
    setPerfilIniciais(state) {
      if(state.perfilNome != null && state.perfilSobrenome != null){
        var nome = state?.perfilNome || ""
        var sobrenome = state?.perfilSobrenome || ""
        state.perfilIniciais =  nome.match(/(\b\S)?/g)!.join("") + sobrenome.match(/(\b\S)?/g)!.join("");
      }
      
    },
  },
  actions: {
    async getUsuarioAtual({commit}){
      const dataBase = await db.collection("users").doc(firebase.auth().currentUser?.uid);
      const resultadoDb = await dataBase.get();
      commit("setPerfilInfo", resultadoDb);
      commit("setPerfilIniciais");
    },
    async listarPosts({state}){
      const dataBase = await db.collection("blogPosts").orderBy('data', 'desc');
      const resultadoDb = await dataBase.get();
      var posts : any[] = [];
      resultadoDb.forEach((doc)=>{
        if (!state.blogPosts.some((post:any) => post!.blogID === doc.id)) {
          const data:any = {
            blogID: doc.data().blogID,
            blogHTML: doc.data().blogHTML,
            blogCardCapa: doc.data().blogFotoCapa,
            blogTitulo: doc.data().blogTitulo,
            blogData: doc.data().data,
            blogNomeFotoCapa: doc.data().blogNomeFotoCapa,
          };
          state.blogPosts!.push(data as never);
        }
      })
      state.postCarregado = true;
      console.log(state.blogPosts)
    },
    async deletarPost({commit}, payload){
      const getPost = await db.collection("blogPosts").doc(payload);
      await getPost.delete();
      commit("filtrarBlogPost", payload);
    },
    async atualizarUsuario({commit, state}){
      const dataBase = await  db.collection("users").doc(state.perfilId);
      await dataBase.update({
        nome: state.perfilNome,
        sobrenome: state.perfilSobrenome,
        usuario: state.perfilUsuario,
      });
      commit("setPerfilIniciais")
    }
  },
  modules: {
  },
});
