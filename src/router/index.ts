import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Blogs from '../views/Blogs.vue';

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
    path: '/Cadastro',
    name: 'Cadastro',

    component: () => import('../views/Cadastro/index.vue'),
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
