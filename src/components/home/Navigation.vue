<template>
  <nav class="navbar">
    <div class="navbar_logo">
      <a href="http://openobject.net/" target="_blank">
        <img src="../../assets/images/header_logo.png" alt="오픈오브젝트 로고이미지">
      </a>
    </div>

    <ul
      class="navbar_menus"
      ref="navbar_menus"
    >
      <li><a href="#">COMPANY</a></li>
      <li><a href="#">BUSINESS</a></li>
      <li><a href="#">RECRUIT</a></li>
      <li><a href="#" @click="print">PREVIEW PRINT</a></li>
    </ul>

    <ul
      class="navbar_icons"
      ref="navbar_icons"
    >
      <li><i class="fab fa-github"></i></li>
      <li><i class="fab fa-facebook"></i></li>
    </ul>

    <a
      href="#"
      class="navbar_toggleBtn"
      @click="toggleBtn"
    >
      <i class="fas fa-hamburger"></i>
    </a>
  </nav>
</template>

<script>
import eventBus from '@/utils/eventBus';
import { EVENTBUS_EVENT } from '@/config/constants';

export default {
  name: 'Navigation',
  methods: {
    toggleBtn() {
      this.$refs.navbar_icons.classList.toggle('active');
      this.$refs.navbar_menus.classList.toggle('active');
      console.log(EVENTBUS_EVENT.TOGGLE_ACTIVE);
      eventBus.$emit(EVENTBUS_EVENT.TOGGLE_ACTIVE);
    },
    print(event) {
      // 출력
      event.preventDefault();
      this.$router.push({ name: 'PrintPage' });
    },
  },
};
</script>

<style lang="scss" scoped>

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #263343;
  padding: 8px 20px;
}

.navbar_menus {
  display: flex;
  list-style: none;
  padding-left: 0;
}

.navbar_menus li {
  padding: 8px 12px;
}

.navbar_menus li:hover {
  background-color: #d49466;
  border-radius: 4px;
}

.navbar_icons {
  list-style: none;
  color: white;
  display: flex;
  padding-left: 0;
}

.navbar_icons li {
  padding: 8px 12px;
}

.navbar_toggleBtn {
  display: none;
  position: absolute;
  right: 32px;
  font-size:24px;
  color: #d49466;
}

@media screen and (max-width:743px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
    padding: 8px 24px;
  }
  .navbar_menus {
    display: none;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  .navbar_menus li {
    width: 100%;
    text-align: center;
  }
  .navbar_icons {
    display: none;
    justify-content: center;
    width: 100%;
  }
  .navbar_toggleBtn {
    display: block;
  }
  .navbar_menus.active,
  .navbar_icons.active {
    display: flex;
  }
}
</style>
