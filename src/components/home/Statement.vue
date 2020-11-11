<template>
  <section class="container">
    <popup
      :visible.sync="visible"
      :popupData="popupData"
    >
    </popup>
    <h2>UI 개발팀 법인카드 사용내역</h2>
    <table>
      <thead>
        <tr>
          <th>내역등록일시</th>
          <th>사용일시</th>
          <th>사용 내역 분류</th>
          <th>고객사</th>
          <th>사용금액</th>
          <th>잔액</th>
          <th>비고</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in historyList" :key="index" @click="onClick(item)">
          <TableRow :item=item />
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>

import fireStore from '@/mixins/fireStore';
import dayjs from 'dayjs';
import TableRow from '@/components/home/TableRow.vue';
import popup from './Popup.vue';

export default {
  name: 'Statement',
  components: {
    TableRow,
    popup,
  },
  props: {
    msg: String,
  },
  mixins: [fireStore],
  data() {
    return {
      usedDate: null,
      category: '',
      amount: null,
      memo: null,
      checkedValue: [],
      visible: false,
      popupData: null,
    };
  },
  filters: {
    numberWithCommas: (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
  },
  methods: {
    addCommas(event) {
      return event.key.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    getList() {
      this.getHistory();
    },
    addUsage() {
      if (!this.usedDate) {
        alert('사용일시를 입력해주세요.');
        return;
      } if (!this.category) {
        alert('분류를 선택해주세요.');
        return;
      } if (!this.amount) {
        alert('사용금액을 입력해주세요.');
        return;
      }

      const useObejct = {
        usedDate: dayjs(this.usedDate).format('YYYY-MM-DD'),
        category: this.category,
        amount: this.amount,
        memo: this.memo || '',
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        timeInMs: Date.now(), // time stamp
      };

      this.registration(useObejct);
    },
    onClick(item) {
      this.popupData = {
        date: item.date,
        usedDate: item.usedDate,
        category: item.category,
        amount: item.amount,
        balance: item.balance,
        memo: item.memo,
      };
      this.visible = !this.visible;
    },
    customFormatter(value) {
      return dayjs(value).format('YYYY-MM-DD');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 12px;
}
select {
  width: 120px;
  height: 30px;
  margin-right: 10px;
}

table {
  font-family: 'Source Sans Pro';
  border-collapse: collapse;
  width: 90%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

.get-list {
  margin: 20px;
}

.edit-area {
  width: 150px;
  margin-top: 20px;
}

.btn {
  width: 50px;
  height: 50px;
  margin: 10px;
  font-size: 1em;
  text-align: center;
  font-weight: bold;
}

.input-area {
  margin: 20px;
}

.get-list-button{
  width: 200px;
  height: 50px;
  font-size: 1em;
  text-align: center;
  font-weight: bold;
}

.table-scroll {
  width:100%;
  height:600px;
  overflow:auto;
}

.registration {
  margin-left: 10px;
}
</style>
