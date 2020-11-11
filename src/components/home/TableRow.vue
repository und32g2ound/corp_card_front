<template>
  <fragment>
      <td>{{item.date}}</td>
      <td>{{item.usedDate || ''}}</td>
      <td>{{item.category}}</td>
      <td>-{{item.amount | numberWithCommas}}</td>
    </fragment>
</template>

<script>
export default {
  name: 'TableRow',
  props: {
    item: {
      type: Object,
      default: null,
      required: true,
    },
  },
  filters: {
    numberWithCommas: (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
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
