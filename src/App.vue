<template>
  <v-app>
    <!-- nav bar -->
  <Navigation></Navigation>

    <!-- router-view -->
    <v-main id="v-main">
      <router-view></router-view>
    </v-main>

    <!-- footer -->
    <Footer></Footer>
  </v-app>
</template>

<script>

import Navigation from '@/components/home/Navigation.vue';
import Footer from '@/components/home/Footer.vue';

export default {
  name: 'App',
  components: {
    Navigation,
    Footer,
  },
  data() {
    return {

    };
  },
};
</script>
