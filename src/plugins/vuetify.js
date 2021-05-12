import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';


Vue.use(Vuetify);
Vue.use(Buefy);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
});
