<template>
  <fragment>
    <section class="container" ref="container">
      <select
        class="category"
        v-model="category"
      >
        <option
          v-for="(item, index) in  categoryList"
          :key="index"
          :value="item"
        >
          {{ item }}
        </option>
      </select>

      <button
        class="registration-button"
        ref="registrationButton"
        @click="searchClick"
      >조회</button>
    </section>
  </fragment>
</template>

<script>
import corpStore from '@/mixins/corpStore';
import eventBus from '@/utils/eventBus';
import { EVENTBUS_EVENT } from '@/config/constants';

export default {
  name: 'SearchArea',
  mixins: [corpStore],
  created() {
    eventBus.$on(EVENTBUS_EVENT.TOGGLE_ACTIVE, this.toggleActive);
  },
  beforeDestroy() {
    eventBus.$off(EVENTBUS_EVENT.TOGGLE_ACTIVE);
  },
  data() {
    return {
      category: '전체',
      categoryList: ['전체', '식사', '간식', '접대', '비품', '회식', '기타'],
    };
  },
  methods: {
    searchClick() {
      this.setSearchHistoryList({ category: this.category });
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
  padding: 8px 20px;
}

.container.active {
  display: flex;
}

.registration-button {
  margin-left: 10px;
}

@media screen and (max-width:743px) {
  .container {
    display: none;
  }
}
</style>
