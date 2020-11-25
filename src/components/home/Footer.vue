<template>
  <v-footer
    padless
    id="footer"
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        text
        rounded
        to="/">Home</v-btn>
      <v-btn
        text
        rounded
        to="/statement">Statement</v-btn>
      <v-btn
        text
        rounded
        to="/print">Print</v-btn>
      <v-btn
        v-show="getIsLogin"
        text
        rounded
        @click="logout"
        >Logout</v-btn>

        <v-col
          class="py-4 text-center"
          cols="12"
        >
        <strong>Since 1999 - {{ new Date().getFullYear() }}
          By.
          <v-btn
            href="http://openobject.net/"
            text
            rounded
            target="_blank"

          >OPENOBJECT</v-btn>
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
