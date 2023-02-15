import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';

const requireComponent = require.context(
  "./components",
  false,
  /Cob[A-Z]\w+\.(vue|js)$/
);



Vue.config.productionTip = false;

let app:any;
firebase.auth().onAuthStateChanged(() =>{
  if(!app){
    new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
    }).$mount('#app');
  }
})


