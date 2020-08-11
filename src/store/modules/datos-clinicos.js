import DatosClinicosService from "../../services/DatosClinicosService";
import {DEFAULT_ERROR_MESSAGE} from "../../constants";

export const namespaced = true;
export const state = {
  loading: false,
};

export const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
};

export const actions = {
  enviarDatosClinicos({commit, dispatch}, datos) {
    commit('SET_LOADING', true);
    return DatosClinicosService.postDatoClinico(datos).then(
      (r) => {
        const snack = {
          type: 'success',
          message: '¡Reporte recibido, muchas gracias!',
        };
        dispatch('snackbars/add', snack, {root: true});
        commit('SET_LOADING', false);
      }
    ).catch(err => {
        if (err.status === 500) {
          const snack = {
            type: 'error',
            message: DEFAULT_ERROR_MESSAGE,
          };
          dispatch('snackbars/add', snack, {root: true});
        };
      commit('SET_LOADING', false);
      throw err;
    });
  },
};
