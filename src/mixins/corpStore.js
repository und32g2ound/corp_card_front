import { createNamespacedHelpers } from 'vuex';

const { mapState, mapMutations, mapActions } = createNamespacedHelpers('corpStore');

export default {
  computed: {
    ...mapState([
      'totalBalanceAmount',
      'historyList',
    ]),
  },
  methods: {
    ...mapMutations([
      'decrement',
      'reset',
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
