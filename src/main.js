import Vue from 'vue';
import './plugins/vuetify';
import './plugins/resource';
import App from './App.vue';
import router from './router';
import store from './store/store';
import { Vuelidate } from 'vuelidate';
import './filters/bytes-filter';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import './registerServiceWorker'
import vuetify from "./plugins/vuetify";
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import VueGeolocation from 'vue-browser-geolocation';

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(VueGeolocation);

// eslint-disable-next-line
delete L.Icon.Default.prototype._getIconUrl;
// eslint-disable-next-line
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');
