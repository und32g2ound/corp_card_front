import Vue from 'vue';
import Vuex from 'vuex';
import fireStore from '@/store/fireStore';
import corpStore from '@/store/corpStore';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    fireStore,
    corpStore,
  },
});
