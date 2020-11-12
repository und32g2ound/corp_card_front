<template>
  <fragment>
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
        <option value="" selected disabled hidden >분류선택</option>
        <option v-for="(item, index) in  categoryList" :value="index" :key="index">{{item}}</option>
      </select>

      <input
        class="customer"
        v-model="customer"
        placeholder="고객사"
      >

      <input
        class="purpose"
        v-model="purpose"
        placeholder="사용목적 또는 사유(상세히)"
      >

      <input
        ref="amount"
        class="amount"
        type="number"
        v-model="amount"
        placeholder="사용금액"
        style="ime-mode:disabled"
      >

      <input class="memo" v-model="memo" placeholder="비고">
      <button
        class="registration-button"
        ref="registrationButton"
        @click="addUsage"
      >등록</button>

    </section>
    <div
      class="invalidate"
      ref="invalidate"
    >
      <i class="fas fa-exclamation-triangle"></i>
      <span>필수 입력사항을 확인해주세요.</span>
    </div>
  </fragment>
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
      usedDate: '',
      category: '',
      customer: '',
      purpose: '',
      amount: '',
      memo: '',
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
    addUsage() {
      if (!this.usedDate || !this.category || !this.customer || !this.purpose || !this.amount) {
        this.$refs.invalidate.classList.toggle('active');
        this.$refs.registrationButton.disabled = true;
        setTimeout(() => {
          this.$refs.invalidate.classList.toggle('active');
          this.$refs.registrationButton.disabled = false;
        }, 3000);
        return;
      }

      const useObejct = {
        usedDate: dayjs(this.usedDate).format('YYYY-MM-DD'),
        category: this.getCategoryName(this.category),
        amount: +this.amount,
        customer: this.customer,
        purpose: this.purpose,
        memo: this.memo || '',
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        timeInMs: Date.now(), // time stamp
      };

      this.registration(useObejct);
      this.initComponentData();
    },
    initComponentData() {
      this.usedDate = '';
      this.category = '';
      this.customer = '';
      this.purpose = '';
      this.amount = '';
      this.memo = '';
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

.amount::-webkit-outer-spin-button,
.amount::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.invalidate {
  display: none;
  text-align: center;
  color: red;
  font-size: 14px;
  padding: 8px 12px;
}

.invalidate i {
  margin: 0 8px;
}

.invalidate.active {
  display: block;
  text-align: center;
  color: red;
  font-size: 14px;
}
</style>
