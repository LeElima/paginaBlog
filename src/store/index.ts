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
  mutations: {
    alterarModoEdicao(state, payload){
      state.modoEdicao = payload;
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
      const dataBase = db.collection("users").doc(firebase.auth().currentUser?.uid);
      const resultadoDb = await dataBase.get();
      commit("setPerfilInfo", resultadoDb);
      commit("setPerfilIniciais");
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
