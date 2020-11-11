<template>
  <div class="popup"
    v-if="visible" @click.self="handleWrapperClick">
    <div class="popup__dialog">
      <header class="popup__header">
        <h5 class="title">사용내역 상세</h5>
      </header>
      <div class="popup__body">
        <table>
          <tbody>
            <tr>
              <td class="title">내역등록일시</td>
              <td>{{popupData.date}}</td>
            </tr>
            <tr>
              <td class="title">사용일시</td>
              <td>{{popupData.usedDate || ''}}</td>
            </tr>
            <tr>
              <td class="title">사용 내역 분류</td>
              <td>{{popupData.category}}</td>
            </tr>
            <tr>
              <td class="title">사용금액</td>
              <td>{{popupData.amount | numberWithCommas}}</td>
            </tr>
            <tr>
              <td class="title">잔액</td>
              <td>{{popupData.balance | numberWithCommas}}</td>
            </tr>
            <tr>
              <td class="title">비고</td>
              <td>{{popupData.memo}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button @click="$emit('update:visible', !visible)">닫기</button>
    </div>
  </div>
</template>

<script>

import common from '@/mixins/fireStore';

export default {
  name: 'Popup',
  props: ['visible', 'popupData'],
  mixins: [common],
  filters: {
    numberWithCommas: (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
  },
  data() {
    return {
      //
    };
  },
  watch: {
    popupData() {
      console.log('popupData:', this.popupData);
    },
  },
  methods: {
    handleWrapperClick() {
      this.$emit('update:visible', false);
    },
  },
};
</script>

<style lang="scss" scoped>
$module: 'popup';

.#{$module} {
  // This is modal bg
  background-color: rgba(0,0,0,.7);
  top: 0; right: 0; bottom: 0; left: 0;
  position: fixed;
  overflow: auto;
  margin: 0;
  //This is modal layer
  &__dialog{
    left: 50%;
    top: 75px;
    width: 600px;
    margin-left: -300px;
    position: absolute;
    background: #fff;
    margin-bottom: 50px;
  }

  &__header {
    font-size: 28px;
    font-weight: bold;
    line-height: 1.29;
    padding: 16px 16px 0 25px;
    position: relative;
    margin: 0 auto;
  }
  &__body {
    padding: 25px;
    min-height: 150px;
    max-height: 412px;
  }
}

table {
  font-family: 'Source Sans Pro';
  border-collapse: collapse;
  width: 90%;
  margin: auto;
}

td, th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}

.title {
  text-align: center;
  font-weight: bold;
}

button {
  position: relative;
  left: 50%;
  width: 50px;
  height: 50px;
  margin: 10px;
  font-size: 1em;
  text-align: center;
  font-weight: bold;
}

</style>
