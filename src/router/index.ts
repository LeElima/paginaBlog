import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Blogs from '../views/Blogs.vue';
import Login from '../views/Login.vue';
import Registrar from '../views/Registrar.vue';
import Senha from '../views/Senha.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    // component: Home,
    component: Home,
    meta:{
      title:'Home'
    }
  },
  {
    path: '/blogs',
    name: 'Blogs',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Blogs,
    meta:{
      title:'Blogs'
    }
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Login,
    meta:{
      title:'Login'
    }
  },
  {
    path: '/registrar',
    name: 'Registrar',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Registrar,
    meta:{
      title:'Registrar'
    }
  },
  {
    path: '/senha',
    name: 'Senha',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Senha,
    meta:{
      title:'Senha'
    }
  },
  
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next)=>{
  document.title = `${to.meta?.title} | PaginaBlog`;
  next();
})

export default router;
