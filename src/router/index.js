import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "print" */ '../views/Login.vue'),
  },
  {
    path: '/statement',
    name: 'Statement',
    component: () => import(/* webpackChunkName: "print" */ '../views/Statement.vue'),
  },
  {
    path: '/print',
    name: 'PrintPage',
    component: () => import(/* webpackChunkName: "print" */ '../views/PrintPage.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
