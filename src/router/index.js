import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import authService from '../plugins/auth';

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
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: loginRequired,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    beforeEnter: loginRequired,
  },
  {
    path: '/print',
    name: 'PrintPage',
    component: () => import(/* webpackChunkName: "print" */ '../views/PrintPage.vue'),
    beforeEnter: loginRequired,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((routeTo, routeFrom, next) => {
//   NProgress.start();
//   next();
// });

// router.afterEach(() => {
//   NProgress.done();
// });

export default router;
