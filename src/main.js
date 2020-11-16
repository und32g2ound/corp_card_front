import Vue from 'vue';
import Fragment from 'vue-fragment';
import App from './App.vue';
import router from './router';
import store from './store';
import 'nprogress/nprogress.css';
import authService from './plugins/auth';

Vue.config.productionTip = false;
Vue.use(Fragment.Plugin);

let mount = null;
authService.setStateCallback((user) => {
  console.log('loginUser:', user ? user.email : 'null');
  authService.setUser(user);

  if (!mount) {
    mount = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
