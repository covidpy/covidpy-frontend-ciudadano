import Vue from 'vue';
import Vuex from 'vuex';
import * as reporteMedico from './modules/reporte-medico';
import * as contactos from './modules/contactos';
import * as notificaciones from './modules/notificaciones';
import * as auth from './modules/auth';
import * as snackbars from './modules/snackbars';
import * as ubicaciones from './modules/ubicaciones';
import * as datosClinicos from './modules/datos-clinicos';
import * as datosBasicos from './modules/datos-basicos';
import * as pwa from './modules/pwa';
import {DEFAULT_ERROR_MESSAGE} from "../constants";

Vue.use(Vuex);

export function defaultServerCall(promise, {commit, dispatch}, {
  successMessage, errorMessage, loadingMutation, validationMutation
}) {
  commit(loadingMutation || 'SET_LOADING', true);
  commit(validationMutation || 'SET_VALIDACION', {});
  return promise.then(r => {
    commit(loadingMutation || 'SET_LOADING', false);
    const snack = {
      type: 'success',
      message: successMessage || '¡Muchas gracias!',
    };
    if (successMessage.length > 0) {
      dispatch('snackbars/add', snack, {root: true});
    }
    return r;
  }).catch((err) => {
      console.error(err);
      commit(loadingMutation || 'SET_LOADING', false);
      if (err.status !== 400 && err.status !== 401) {
        const snack = {
          type: 'error',
          message: errorMessage || DEFAULT_ERROR_MESSAGE,
        };
        dispatch('snackbars/add', snack, {root: true});
      } else {
        commit(validationMutation || 'SET_VALIDACION', err.body);
      }
      throw err;
    }
  );

}


export default new Vuex.Store({
  modules: {
    reporteMedico,
    contactos,
    notificaciones,
    auth,
    snackbars,
    ubicaciones,
    datosClinicos,
    datosBasicos,
    pwa,
  },
});
