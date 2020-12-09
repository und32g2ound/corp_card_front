import '@fortawesome/fontawesome-free/css/all.css';
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      light: {
        primary: '#2E509D',
        secondary: '#373F50',
        accent: colors.grey.darken1,
        error: colors.red.accent3,
      },
      dark: {
        primary: '#121212',
        secondary: '#121212',
        accent: '#2196f3',
        textField: '#fff',
      },
    },
  },
  icons: {
    iconfont: 'fa',
  },
});
