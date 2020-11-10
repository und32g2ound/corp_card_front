<template>
  <div class="home">
    <!-- navigation -->
    <Navigation />
    <!-- 등록 및 입력 영역 -->
    <RegArea />
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
import Footer from '@/components/home/Footer.vue';

export default {
  name: 'Home',
  components: {
    Statement,
    Navigation,
    RegArea,
    Footer,
  },
};
</script>
