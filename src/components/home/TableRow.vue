<template>
  <fragment>
      <!-- <td>{{item.date}}</td> -->
      <td>{{item.usedDate || ''}}</td>
      <td>{{item.category}}</td>
      <td>{{item.customer}}</td>
      <td>{{item.purpose}}</td>
      <td>-{{utils.numberWithCommas(item.amount)}}</td>
      <!-- <td>{{utils.numberWithCommas(item.balance)}}</td>
      <td>{{item.memo}}</td> -->
    </fragment>
</template>

<script>
import utils from '@/utils/utils';

export default {
  name: 'TableRow',
  mixins: [utils],
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      utils,
    };
  },
};
</script>

<style lang="scss" scoped>
td, th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
