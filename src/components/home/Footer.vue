<template>
  <v-footer
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="link in links"
        :key="`${link.label}-footer-link`"

        text
        rounded
        class="my-2"
        :to="link.routePath"
      >
        {{ link.label }}
      </v-btn>
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
export default {
  name: 'Footer',
  data() {
    return {
      links: [
        {
          label: 'Home',
          routePath: '/',
        },
        {
          label: 'Statement',
          routePath: '/statement',
        },
        {
          label: 'Print',
          routePath: '/print',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
