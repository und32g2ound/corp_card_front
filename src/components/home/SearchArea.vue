<template>
  <fragment>
    <section class="container">
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
// import fireStore from '@/mixins/fireStore';
import corpStore from '@/mixins/corpStore';

export default {
  name: 'SearchArea',
  mixins: [corpStore],
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
  },
};
</script>

<style lang="scss" scoped>

.container {
  display: flex;
  justify-content: center;
  padding: 8px 20px;
}

.registration-button {
  margin-left: 10px;
}
</style>
