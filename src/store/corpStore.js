import axios from 'axios';
import { MAX_LIMIT_A_MONTH } from '@/config/constants';
import appConfig from '@/config/appConfig';

export default {
  namespaced: true,
  state: {
    totalBalanceAmount: 0,
    historyList: [],
    searchHistoryList: [],
  },
  mutations: {
    setHistoryList(state, payload) {
      // 최근 사용내역으로 정렬
      payload.historyList.sort((a, b) => b.timeInMs - a.timeInMs);
      state.historyList = payload.historyList;
    },
    setSearchHistoryList(state, payload) {
      if (payload.category === '전체') {
        state.searchHistoryList = state.historyList;
      } else {
        state.searchHistoryList = state.historyList.filter(
          (info) => info.category === payload.category,
        );
      }
    },
    setTotalBalanceAmount(state, payload) {
      state.totalBalanceAmount = payload.totalBalanceAmount;
    },
  },
  actions: {
    initialize({ commit, dispatch }) {
      /**
       * 법인카드 한도 및 문서가 존재하지 않는 경우 생성
      */
      axios.get(`${appConfig.serverIP}/corp/getTotal`).then((response) => {
        const total = response.data && response.data[0] ? response.data[0] : null;
        console.log('initialize total : ', total);

        if (!total || !total.balance) {
          dispatch('setTotalAmout', MAX_LIMIT_A_MONTH);
        } else {
          commit('setTotalBalanceAmount', { totalBalanceAmount: total.balance });
        }
      });
    },
    setTotalAmout({ commit }, balance) {
      axios.post(`${appConfig.serverIP}/corp/setTotal`, {
        balance,
      }).then(() => {
        commit('setTotalBalanceAmount', { totalBalanceAmount: balance });
      });
    },
    updateTotalAmout({ commit }, balance) {
      axios.post(`${appConfig.serverIP}/corp/updateTotal`, {
        balance,
      }).then(() => {
        commit('setTotalBalanceAmount', { totalBalanceAmount: balance });
      });
    },
    getHistory({ state, commit }) {
      const historyList = [];

      axios.get(`${appConfig.serverIP}/corp/getList`).then((response) => {
        const usageList = response.data ? response.data : [];

        usageList.forEach((item) => {
          const {
            amount, date, timeInMs, category, memo, usedDate, customer, purpose,
          } = item;

          const balance = state.totalBalanceAmount;

          const usageObject = {
            amount,
            balance,
            date,
            timeInMs,
            category,
            memo,
            usedDate,
            customer,
            purpose,
          };

          historyList.push(usageObject);
        });

        commit('setHistoryList', { historyList });
      });
    },
    registration({ state, dispatch }, params) {
      const balance = state.totalBalanceAmount - params.amount;

      axios.post(`${appConfig.serverIP}/corp/registUsage`, {
        params,
      }).then(() => {
        dispatch('updateTotalAmout', balance);
        dispatch('getHistory');
      }).catch((err) => {
        console.error(err);
      });
    },
    deleteData({ state, dispatch }, params) {
      const { amount } = params;
      const balance = state.totalBalanceAmount + amount;

      axios.post(`${appConfig.serverIP}/corp/deleteUsage`, {
        params,
      }).then(() => {
        dispatch('updateTotalAmout', balance);
        dispatch('getHistory');
      }).catch((err) => {
        console.error(err);
      });
    },
    editColumn({ state, dispatch }, params) {
      const editAmount = params.amount;
      let balance = 0;

      axios.post(`${appConfig.serverIP}/corp/editUsage`, {
        params,
      }).then(() => {
        if (editAmount) {
          balance = state.totalBalanceAmount + params.amount;
          dispatch('updateTotalAmout', balance);
        }
        dispatch('getHistory');
      }).catch((err) => {
        console.error(err);
      });
    },
  },
};
