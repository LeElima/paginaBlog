import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Blogs from '../views/Blogs.vue';
import Login from '../views/Login.vue';
import Registrar from '../views/Registrar.vue';
import Senha from '../views/Senha.vue';
import Perfil from '../views/Perfil.vue';
import Admin from '../views/Admin.vue';
import CriarPost from '../views/CriarPost.vue';
import PostPrevia from '../views/PostPrevia.vue';
import VerPost from '../views/VerPost.vue';
import EditarBlog from '../views/EditarBlog.vue';
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      title:'Home'
    }
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs,
    meta:{
      title:'Blogs'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
      title:'Login'
    }
  },
  {
    path: '/registrar',
    name: 'Registrar',
    component: Registrar,
    meta:{
      title:'Registrar'
    }
  },
  {
    path: '/senha',
    name: 'Senha',
    component: Senha,
    meta:{
      title:'Senha'
    }
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: Perfil,
    meta:{
      title:'Perfil'
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta:{
      title:'Admin'
    }
  },
  {
    path: '/criar-post',
    name: 'CriarPost',
    component: CriarPost,
    meta:{
      title:'CriarPost'
    }
  },
  {
    path: '/post-previa',
    name: 'PostPrevia',
    component: PostPrevia,
    meta:{
      title:'Previa'
    }
  },
  {
    path: '/ver-post/:blogId',
    name: 'VerPost',
    component: VerPost,
    meta:{
      title:'Ver Post'
    }
  },
  {
    path: '/editar/:blogId',
    name: 'EditarBlog',
    component: EditarBlog,
    meta:{
      title:'Editar'
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
