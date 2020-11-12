import { createNamespacedHelpers } from 'vuex';

const { mapState, mapMutations, mapActions } = createNamespacedHelpers('corpStore');

export default {
  computed: {
    ...mapState([
      'totalBalanceAmount',
      'historyList',
      'searchHistoryList',
    ]),
  },
  methods: {
    ...mapMutations([
      'decrement',
      'reset',
      'setSearchHistoryList',
    ]),
    ...mapActions([
      'initialize',
      'getHistory',
      'registration',
      'deleteData',
      'editColumn',
    ]),
  },
};
