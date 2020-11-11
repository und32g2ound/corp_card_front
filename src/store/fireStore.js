import fireStore from '@/config/fireStore';
import MAX_LIMIT_A_MONTH from '@/config/constants';

export default {
  namespaced: true,
  state: {
    totalBalanceAmount: 0,
    historyList: [],
  },
  mutations: {
    setHistoryList(state, payload) {
      // 최근 사용내역으로 정렬
      payload.historyList.sort((a, b) => b.timeInMs - a.timeInMs);
      state.historyList = payload.historyList;
    },
    setTotalBalanceAmount(state, payload) {
      state.totalBalanceAmount = payload.totalBalanceAmount;
    },
  },
  actions: {
    async initialize({ commit }) {
      /**
       * 법인카드 한도 및 문서가 존재하지 않는 경우 생성
      */
      const docRef = fireStore.collection('corp_total').doc('balance');
      docRef.get().then((doc) => {
        if (!doc.exists) {
          console.log('Not exiest!');
          fireStore.collection('corp_total').doc('balance').set({
            amount: MAX_LIMIT_A_MONTH,
          });
        } else {
          const { amount } = doc.data();
          commit('setTotalBalanceAmount', { totalBalanceAmount: amount });
        }
      });
    },
    async getHistory({ commit }) {
      const historyList = [];
      fireStore.collection('corp_usage').get().then((usageList) => {
        usageList.forEach((item) => {
          const {
            amount, balance, date, timeInMs, category, usedDate, memo, customer,
          } = item.data();
          const usageObject = {
            amount,
            balance,
            date,
            timeInMs,
            category,
            usedDate,
            memo,
            customer,
          };
          historyList.push(usageObject);
        });

        commit('setHistoryList', { historyList });
      });
    },
    registration({ commit, state }, params) {
      const {
        amount, date, category, timeInMs, memo, usedDate, customer,
      } = params;

      const balance = state.totalBalanceAmount - amount;

      const docKey = String(timeInMs);
      fireStore.collection('corp_usage').doc(docKey).set({
        amount,
        date,
        category,
        timeInMs,
        balance,
        memo,
        usedDate,
        customer,
      });

      fireStore.collection('corp_total').doc('balance').set({
        amount: balance,
      });
      commit('setTotalBalanceAmount', { totalBalanceAmount: balance });

      const historyList = [];
      fireStore.collection('corp_usage').get().then((usageList) => {
        usageList.forEach((item) => {
          const {
            amount, balance, date, timeInMs, category, memo, usedDate, customer,
          } = item.data();
          const usageObject = {
            amount,
            balance,
            date,
            timeInMs,
            category,
            memo,
            usedDate,
            customer,
          };
          historyList.push(usageObject);
        });

        commit('setHistoryList', { historyList });
      });
    },
    deleteData({ commit, state }, params) {
      const {
        amount, date,
      } = params;

      const balance = state.totalBalanceAmount + amount;

      fireStore.collection('corp_usage').doc(date).delete().then(() => {
        console.log('Document successfully deleted!');
      });

      fireStore.collection('corp_total').doc('balance').set({
        amount: balance,
      });
      commit('setTotalBalanceAmount', { totalBalanceAmount: balance });

      const historyList = [];
      fireStore.collection('corp_usage').get().then((usageList) => {
        usageList.forEach((item) => {
          const {
            amount, balance, date, timeInMs, category, memo, usedDate,
          } = item.data();
          const usageObject = {
            amount,
            balance,
            date,
            timeInMs,
            category,
            memo,
            usedDate,
          };
          historyList.push(usageObject);
        });

        commit('setHistoryList', { historyList });
      });
    },
  },
};
