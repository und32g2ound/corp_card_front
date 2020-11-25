<template>
  <fragment>
    <v-card
      v-if="!isLogin"
      width="400"
      class="mx-auto mt-5"
    >
      <v-card-title>
        <h1 class="display-1">Login</h1>
        <v-card-subtitle>a@a.com / 123456</v-card-subtitle>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="email"
            label="Email"
            prepend-icon="mdi-account-circle"
          />
          <v-text-field
            v-model="password"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="login">
          Login
        </v-btn>
      </v-card-actions>
    </v-card>

  <v-row class="flex-column" justify="center" align="center" v-else>
    <v-img
      src="@/assets/images/login.jpg"
      max-width="920"
      max-height="460"
      class="mt-5"
    >
    </v-img>
    <v-card-title>
      {{ getLoginAccount }} 계정으로 로그인 됨
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="email"
          label="Email"
          prepend-icon="mdi-account-circle"
          @keyup.enter="login"
        />
        <v-text-field
          v-model="password"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          @keyup.enter="login"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="login">
        Login
      </v-btn>
    </v-card-actions>
  </v-row>
</template>

<script>
import authService from '@/plugins/auth';
import eventBus from '@/utils/eventBus';
import { EVENTBUS_EVENT } from '@/config/constants';

export default {
  name: 'Login',
  data() {
    return {
      showPassword: false,
      email: '',
      password: '',
    };
  },
  computed: {
    isLogin() {
      console.log(authService.user.email);
      return authService.authenticated();
    },
    getLoginAccount() {
      return authService.user.email;
    },
  },
  methods: {
    login() {
      authService.login(this.email, this.password)
        .then((user) => {
          if (user) {
            eventBus.$emit(EVENTBUS_EVENT.TOGGLE_LOGOUT);
            this.$router.replace('/statement');
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
