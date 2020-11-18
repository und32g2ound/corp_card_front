<template>
  <fragment>
    <section class="container" ref="container">
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
        <option v-for="(item, index) in  categoryList" :value="item" :key="index">{{item}}</option>
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

import corpStore from '@/mixins/corpStore';
import dayjs from 'dayjs';
import Datepicker from 'vuejs-datepicker';
import { ko } from 'vuejs-datepicker/dist/locale';
import eventBus from '@/utils/eventBus';
import { EVENTBUS_EVENT } from '@/config/constants';

export default {
  name: 'RegArea',
  components: {
    Datepicker,
  },
  mixins: [corpStore],
  created() {
    eventBus.$on(EVENTBUS_EVENT.TOGGLE_ACTIVE, this.toggleActive);
  },
  beforeDestroy() {
    eventBus.$off(EVENTBUS_EVENT.TOGGLE_ACTIVE);
  },
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
        category: this.category,
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
    toggleActive() {
      this.$refs.container.classList.toggle('active');
    },
  },
};
</script>

<style lang="scss" scoped>

.container {
  display: flex;
  justify-content: center;
  padding: 20px 20px;
}

.container.active {
  display: flex;
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

@media screen and (max-width:743px) {
  .container {
    flex-direction: column;
    padding: 8px 24px;
    display: none;
  }
}
</style>
