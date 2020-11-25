import Vue from 'vue';
import VueRouter from 'vue-router';
import authService from '@/plugins/auth';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

function loginRequired(to, from, next) {
  if (authService.authenticated()) {
    next();
  } else {
    next('/login');
  }
}

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "print" */ '../views/Login.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: loginRequired,
  },
  {
    path: '/statement',
    name: 'Statement',
    component: () => import(/* webpackChunkName: "print" */ '../views/Statement.vue'),
    beforeEnter: loginRequired,
  },
  {
    path: '/print',
    name: 'PrintPage',
    component: () => import(/* webpackChunkName: "print" */ '../views/PrintPage.vue'),
    beforeEnter: loginRequired,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
