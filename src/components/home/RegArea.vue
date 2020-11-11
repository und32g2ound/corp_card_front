<template>
  <section class="container">
    <Datepicker
      class="datepicker"
      v-model="usedDate"
      :format="customFormatter"
      :language="ko"
      :disabled-dates="disabledDates"
      :highlighted="highlighted"
      placeholder="사용일시(필수)"
    />

    <select
      class="category"
      v-model="category"
    >
        <option value="" selected disabled hidden >분류선택(필수)</option>
        <option v-for="(item, index) in  categoryList" :value="index" :key="index">{{item}}</option>
    </select>

    <input
      class="amount"
      v-model="amount"
      placeholder="사용금액(필수)"
      @keyup="addCommas"
      style="ime-mode:disabled"
    >

    <input class="memo" v-model="memo" placeholder="비고">

    <button class="registration-button" @click="addUsage">등록</button>
  </section>
</template>

<script>
import fireStore from '@/mixins/fireStore';
import dayjs from 'dayjs';
import Datepicker from 'vuejs-datepicker';
import { ko } from 'vuejs-datepicker/dist/locale';

export default {
  name: 'RegArea',
  components: {
    Datepicker,
  },
  mixins: [fireStore],
  data() {
    return {
      usedDate: null,
      category: '',
      amount: null,
      memo: null,
      checkedValue: [],
      categoryList: ['식사', '간식', '접대', '비품', '회식', '기타'],
      ko,
      disabledDates: {
        customPredictor(date) {
          if (dayjs(date).format('YYYY-MM-DD') > dayjs(Date.now()).format('YYYY-MM-DD')) {
            return true;
          }
          return false;
        },
      },
      highlighted: {
        customPredictor(date) {
          if (dayjs(date).format('YYYY-MM-DD') === dayjs(Date.now()).format('YYYY-MM-DD')) {
            return true;
          }
          return false;
        },
      },
    };
  },
  methods: {
    getCategoryName(item) {
      let categoryName = '';
      switch (item) {
        case 0:
          categoryName = '식사';
          break;
        case 1:
          categoryName = '간식';
          break;
        case 2:
          categoryName = '접대';
          break;
        case 3:
          categoryName = '비품';
          break;
        case 4:
          categoryName = '회식';
          break;
        case 5:
          categoryName = '기타';
          break;
        default:
          categoryName = '기타';
          break;
      }
      return categoryName;
    },
    addCommas(event) {
      return event.key.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    addUsage() {
      if (!this.usedDate) {
        alert('사용일시를 입력해주세요.');
        return;
      }
      if (!this.category) {
        alert('분류를 선택해주세요.');
        return;
      }
      if (!this.amount) {
        alert('사용금액을 입력해주세요.');
        return;
      }

      const useObejct = {
        usedDate: dayjs(this.usedDate).format('YYYY-MM-DD'),
        category: this.getCategoryName(this.category),
        amount: this.amount,
        memo: this.memo || '',
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        timeInMs: Date.now(), // time stamp
      };

      this.registration(useObejct);
    },
    editUsage() {
      // 수정
    },
    deleteUsage() {
      // 삭제
    },
    customFormatter(date) {
      return dayjs(date).format('YYYY-MM-DD');
    },
  },
};
</script>

<style lang="scss" scoped>

.container {
  display: flex;
  justify-content: center;
  // background-color: #263343;
  padding: 20px 20px;
}
</style>
