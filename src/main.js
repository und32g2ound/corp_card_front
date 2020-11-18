import Vue from 'vue';
import Fragment from 'vue-fragment';
import App from './App.vue';
import router from './router';
import store from './store';
import 'nprogress/nprogress.css';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.use(Fragment.Plugin);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
