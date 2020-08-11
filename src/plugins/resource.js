import Vue from 'vue'
import VueResource from 'vue-resource'
import moment from 'moment';
import Vuelidate from 'vuelidate';
import vueFilterPrettyBytes from 'vue-filter-pretty-bytes'
import {longClickDirective} from 'vue-long-click'
import store from '../store/store';

Vue.use(VueResource);
Vue.http.interceptors.push((request, next) => {
  const authUser = store.state.auth.token;
  if(authUser) request.headers.set('Authorization', 'Bearer ' + authUser);
  request.headers.set('Accept', 'application/json');
  next();
});
Vue.http.interceptors.push(function (request, next) {
  next((response) => {
    if (response.status === 403 || response.status === 401) {
      store.dispatch('auth/logout');
      if (this.$route.name !== 'login') {
        if (response.status === 401) {
          store.dispatch('snackbars/clear');
          store.dispatch('snackbars/add', {
            message: 'Su sesión expiró, por favor vuelva a iniciar sesión',
          });
        }
        this.$router.push({path: '/login', query: {'redirect': this.$route.path}}).catch(err => {});
      }
    } else if (response.status === 400) {
      if (response.body.parameterViolations) {
        response.body = response.body.parameterViolations.reduce((validation, currentValidation) =>  {
          const split = currentValidation.path.split(".");
          if (!validation[split[split.length - 1]]) {
            validation[split[split.length - 1]] = [];
          }
          validation[split[split.length - 1]].push(
            currentValidation.message
          );
          return validation;
        }, {});
      }
    }
  })
});
Vue.use(Vuelidate);
Vue.use(vueFilterPrettyBytes);
moment.locale('es');

const longClickInstance = longClickDirective({delay: 400, interval: 50});
Vue.directive('longclick', longClickInstance);

