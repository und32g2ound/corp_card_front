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
        <v-form v-model="valid" lazy-validation ref="form">
          <v-text-field
            v-model="email"
            label="Email"
            prepend-icon="mdi-account-circle"
            @keyup.enter="login"
            :rules="emailRules"
            required
          />
          <v-text-field
            v-model="password"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            @keyup.enter="login"
            :rules="passwordRules"
            required
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
        src="@/assets/images/goback_simpson.gif"
        max-width="920"
        max-height="460"
        class="mt-5"
      >
      </v-img>
      <v-card-title>
        {{ getLoginAccount }} 계정으로 로그인 됨
      </v-card-title>
    </v-row>
    <v-row class="flex-column" justify="center" align="center">
      <v-switch
        v-model="$vuetify.theme.dark"
        hint=""
        :label="getSwitchLabel"
        persistent-hint
        color="accent"
        :append-icon="getSwitchIconName"
      ></v-switch>
      </v-row>

  </fragment>
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
      valid: true,
      emailRules: [
        (v) => !!v || 'E-mail 필수입력.',
        (v) => /.+@.+\..+/.test(v) || 'E-mail형식에 맞게 입력해주세요 (abc@abc.com)',
      ],
      passwordRules: [
        (v) => !!v || 'Password 필수입력.',
        (v) => (v && v.length >= 6) || 'Password는 최소 6자리 이상입니다.',
      ],

    };
  },
  computed: {
    isLogin() {
      return authService.authenticated();
    },
    getLoginAccount() {
      return authService.user.email;
    },
    getSwitchLabel() {
      return !this.$vuetify.theme.dark ? '다크 모드로 보기' : '라이트 모드로 보기';
    },
    getSwitchIconName() {
      return !this.$vuetify.theme.dark ? 'mdi-weather-night' : 'mdi-white-balance-sunny';
    },
  },
  methods: {
    login() {
      if (!this.validate()) {
        this.$refs.form.reset();
        this.$refs.form.resetValidation();
        return;
      }

      authService.login(this.email, this.password)
        .then((user) => {
          if (user) {
            eventBus.$emit(EVENTBUS_EVENT.TOGGLE_LOGOUT);
            this.$router.replace('/statement');
          }
        });
    },
    validate() {
      return this.$refs.form.validate();
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
