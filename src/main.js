import Vue from 'vue';
import Fragment from 'vue-fragment';
import App from './App.vue';
import router from './router';
import store from './store';
import 'nprogress/nprogress.css';

Vue.config.productionTip = false;
Vue.use(Fragment.Plugin);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
