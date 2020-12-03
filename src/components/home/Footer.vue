<template>
  <v-footer
    padless
    id="footer"
    color="secondary"
  >
    <v-row
      justify="center"
      no-gutters
    >
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

        <v-col
          class="py-4 text-center"
          cols="12"
        >
        <strong class="white--text">Since 1999 - {{ new Date().getFullYear() }}
          By.
          <v-btn
            href="http://openobject.net/"
            text
            rounded
            target="_blank"
          ><span class="white--text">OPENOBJECT</span></v-btn>
          . All Rights reserved.
        </strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
import authService from '@/plugins/auth';
import eventBus from '@/utils/eventBus';
import { EVENTBUS_EVENT } from '@/config/constants';
import utils from '@/utils/utils';

export default {
  name: 'Footer',
  created() {
    eventBus.$on(EVENTBUS_EVENT.TOGGLE_LOGOUT, this.toggleLogOut);
  },
  beforeDestroy() {
    eventBus.$off(EVENTBUS_EVENT.TOGGLE_LOGOUT, this.toggleLogOut);
  },
  computed: {
    getIsLogin() {
      return this.isLogin;
    },
    checkIsMobileDevice() {
      return utils.isMobileDevice();
    },
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
  data() {
    return {
      isLogin: false,
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
