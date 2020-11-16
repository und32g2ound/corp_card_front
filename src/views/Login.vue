<template>
  <section class="form animated flipInX">
    <h2>Login To Your Account</h2>
    <form class="loginbox" autocomplete="off">
      <input v-model="email" placeholder="E-mail" type="text" />
      <input v-model="password" placeholder="Password" type="password" @keydown.enter="login" />
      <input type="button" class="submit" @click="login" value="Login" />
    </form>
  </section>
</template>

<script>
import authService from '@/plugins/auth';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      authService.login(this.email, this.password)
        .then((user) => {
          if (user) {
            this.$router.replace('/');
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  position: absolute;
  top: 50%;
  left: 50%;
  background: #fff;
  width: 285px;
  margin: -140px 0 0 -182px;
  padding: 40px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  h2 {
    margin: 0 0 20px;
    line-height: 1;
    color: #44c4e7;
    font-size: 18px;
    font-weight: 400;
  }
  input {
    outline: none;
    display: block;
    width: 100%;
    margin: 0 0 20px;
    padding: 10px 15px;
    border: 1px solid #ccc;
    color: #ccc;
    font-family: "Roboto";
    box-sizing: border-box;
    font-size: 14px;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: 0.2s linear;
    &input:focus {
      color: #333;
      border: 1px solid #44c4e7;
    }
  }
  .submit {
    cursor: pointer;
    background: #44c4e7;
    width: 100%;
    padding: 10px 15px;
    border: 0;
    color: #fff;
    font-family: "Roboto";
    font-size: 14px;
    font-weight: 400;
    &:hover {
      background: #369cb8;
    }
  }
}
</style>
