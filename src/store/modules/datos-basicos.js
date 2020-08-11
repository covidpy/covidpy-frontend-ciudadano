import {DEFAULT_ERROR_MESSAGE} from "../../constants";
import DatosBasicosService from "../../services/DatosBasicosService";
import {defaultServerCall} from "../store";

export const namespaced = true;

export const state = {
  loading: {
    get: false,
    add: false,
  },
  errores: {},
  datos: null,
  diasCuarentena: null,
};

export const mutations = {
  SET_LOADING_FORM(state, loading) {
    state.loading.form = loading;
  },
  SET_ERRORES(state, errores) {
    state.errores = errores;
  },
  SET_LOADING_ADD(state, loading) {
    state.loading.add = loading;
  },
  SET_LOADING_GET(state, loading) {
    state.loading.get = loading;
  },
  SET_DATOS_BASICOS(state, datos) {
    state.datos = datos;
  },
  SET_DIAS_CUARENTENA(state, dias) {
    state.diasCuarentena = dias;
  },
};

export const actions = {
  enviarDatos({commit, dispatch}, datos) {
    commit('SET_LOADING_ADD', true);
    commit('SET_ERRORES', {});
    return DatosBasicosService.putDatoBasico(datos)
        .then(contacto => {
          commit('SET_DATOS_BASICOS', datos);
          commit('SET_LOADING_ADD', false);
          const snack = {
            type: 'success',
            message: 'Datos guardados correctamente',
            permanent: true,
          };
          dispatch('snackbars/add', snack, {root: true});
    }).catch(
        (err) => {
          let message = null;
          console.log(err);
          if (err.status === 400) {
            commit('SET_ERRORES', err.body);
            message = 'Tiene errores en su formulario';
          } else if (err.status !== 401) {
            message = DEFAULT_ERROR_MESSAGE;
          }
          if (message) {
            const snack = {
              type: 'error',
              message: message,
            };
            dispatch('snackbars/add', snack, {root: true});
            commit('SET_LOADING_ADD', false);
          }
          throw err;
        },
      );
  },
  getDatosBasicos({commit, dispatch}) {
    commit('SET_LOADING_GET', true);
    return DatosBasicosService.getDatosBasicos().then((r) => {
      r.json().then(datos => {
        commit('SET_DATOS_BASICOS', datos);
        commit('SET_LOADING_GET', false);
        return datos;
      });
    }).catch(
        (err) => {
          commit('SET_LOADING_GET', false);
          const snack = {
            type: 'error',
            message: `No se pudo obtener los datos básicos`,
            permanent: true,
          };
          dispatch('snackbars/add', snack, {root: true});
          commit('SET_DATOS_BASICOS', null);
        }
    );
  },
  obtenerDiasCuarentena({commit}) {
    return DatosBasicosService.getDiasAislamiento().then(
      (r) => {
        r.json().then(dias => {
          commit('SET_DIAS_CUARENTENA', dias.dias);
        });
      },
    );
  },
};

export const getters = {
  isAddLoading: state => state.loading.add,
  isGetLoading: state => state.loading.get,
};
