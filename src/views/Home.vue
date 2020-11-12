<template>
  <div class="home">
    <!-- navigation -->
    <Navigation />
    <!-- 등록 및 입력 영역 -->
    <RegArea />
    <!-- 조회 영역 -->
    <SearchArea />
    <!-- statement(내역) -->
    <Statement />
    <!-- footer -->
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Statement from '@/components/home/Statement.vue';
import Navigation from '@/components/home/Navigation.vue';
import RegArea from '@/components/home/RegArea.vue';
import SearchArea from '@/components/home/SearchArea.vue';
import Footer from '@/components/home/Footer.vue';

import index from '@/store/index';
import NProgress from 'nprogress';

export default {
  name: 'Home',
  components: {
    Statement,
    Navigation,
    RegArea,
    SearchArea,
    Footer,
  },
  async beforeRouteEnter(to, from, next) {
    NProgress.start();
    await index.dispatch('fireStore/initialize');
    await index.dispatch('fireStore/getHistory');
    next(() => {
      NProgress.done();
    });
  },
};
</script>
