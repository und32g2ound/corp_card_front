import Vue from 'vue';
import Fragment from 'vue-fragment';
import authService from '@/plugins/auth';
import App from './App.vue';
import router from './router';
import store from './store';
import 'nprogress/nprogress.css';
import vuetify from './plugins/vuetify';

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
      vuetify,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
