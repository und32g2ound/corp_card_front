<template>
  <v-app-bar
    app
    id="navigation"
    color="primary"
  >
    <v-toolbar-title>
      <span class="white--text">신기술 사업부 UI개발팀</span>

    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn
      text
      rounded
      to="/">
      <span class="white--text">Home</span></v-btn>
    <v-btn
      text
      rounded
      to="/statement">
      <span class="white--text">Statement</span></v-btn>
    <v-btn
      v-if="!checkIsMobileDevice"
      text
      rounded
      to="/print">
      <span class="white--text">Print</span></v-btn>
    <v-btn
      v-show="getIsLogin"
      text
      rounded
      @click="logout">
      <span class="white--text">Logout</span></v-btn>
  </v-app-bar>
</template>

<script>
import authService from '@/plugins/auth';
import eventBus from '@/utils/eventBus';
import { EVENTBUS_EVENT } from '@/config/constants';
import utils from '@/utils/utils';

export default {
  name: 'Navigation',
  data() {
    return {
      isLogin: false,
    };
  },
  computed: {
    getIsLogin() {
      return this.isLogin;
    },
    checkIsMobileDevice() {
      return utils.isMobileDevice();
    },
  },
  created() {
    eventBus.$on(EVENTBUS_EVENT.TOGGLE_LOGOUT, this.toggleLogOut);
  },
  beforeDestroy() {
    eventBus.$off(EVENTBUS_EVENT.TOGGLE_LOGOUT, this.toggleLogOut);
  },
  mounted() {
    this.toggleLogOut();
  },
  methods: {
    logout() {
      authService.logout()
        .then(() => {
          eventBus.$emit(EVENTBUS_EVENT.TOGGLE_LOGOUT);
          this.$router.replace('/login');
        });
    },
    toggleLogOut() {
      this.isLogin = authService.authenticated();
    },
  },

};
</script>

<style lang="scss" scoped>

</style>
