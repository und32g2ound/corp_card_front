<template>
  <v-card
    width="400"
    class="mx-auto mt-5"
  >
    <v-card-title>
      <h1 class="display-1">Login</h1>
      <v-card-subtitle>아직 로그인 기능없음!</v-card-subtitle>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          label="UserName"
          prepend-icon="mdi-account-circle"
        />
        <v-text-field
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="success"
      >Register
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
      color="info"
      >Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      showPassword: false,
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
