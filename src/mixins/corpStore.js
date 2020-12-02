import { createNamespacedHelpers } from 'vuex';

const { mapState, mapMutations, mapActions } = createNamespacedHelpers('corpStore');

export default {
  computed: {
    ...mapState([
      'limitBalance',
      'totalBalanceAmount',
      'historyList',
      'searchHistoryList',
      'selectDate',
    ]),
  },
  methods: {
    ...mapMutations([
      'decrement',
      'reset',
      'setSearchHistoryList',
      'setSelectDate',
    ]),
    ...mapActions([
      'initialize',
      'getHistory',
      'registration',
      'deleteData',
      'editColumn',
      'updateLimitBalance',
    ]),
  },
};
