import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    blogsCards:[
      {blogTitulo:"Blog Card 1", blogCardCapa:"stock-1", blogData:"30 de Maio de 2022"},
      {blogTitulo:"Blog Card 2", blogCardCapa:"stock-2", blogData:"30 de Maio de 2022"},
      {blogTitulo:"Blog Card 3", blogCardCapa:"stock-3", blogData:"30 de Maio de 2022"},
      {blogTitulo:"Blog Card 4", blogCardCapa:"stock-4", blogData:"30 de Maio de 2022"},
    ],
    modoEdicao:null
  },
  mutations: {
    alterarModoEdicao(state, payload){
      state.modoEdicao = payload;
    }
  },
  actions: {
  },
  modules: {
  },
});
