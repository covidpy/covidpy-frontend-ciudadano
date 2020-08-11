import ReporteMedicoService from "../../services/ReporteMedicoService";
import {defaultServerCall} from "../store";

const PASO_SESSION_STORAGE = 'covid-reportemedico-paso';
export const namespaced = true;
export const state = {
  form: null,
  loading: {
    get: false,
    add: false,
    firstTime: false,
  },
  validacion: {},
  esPrimeraVez: false,
  debeReportarFiebreAyer: false,
  recomendaciones: null,

};

export const mutations = {
  SET_FORM(state, form) {
    state.form = form;
  },
  SET_GET_LOADING(state, loading) {
    state.loading.get = loading;
  },
  SET_ADD_LOADING(state, loading) {
    state.loading.add = loading;
  },
  SET_FIRST_TIME_LOADING(state, loading) {
    state.loading.firstTime = loading;
  },
  SET_VALIDACION(state, validacion) {
   state.validacion = validacion;
  },
  SET_ES_PRIMERA_VEZ(state, firstTime) {
    state.esPrimeraVez = firstTime;
  },
  SET_RECOMENDACIONES(state, recomendaciones) {
    state.recomendaciones = recomendaciones;
  },
  SET_DEBE_REPORTAR_FIEBRE_AYER(state, debeReportarFiebreAyer) {
    state.debeReportarFiebreAyer = debeReportarFiebreAyer;
  },
};

export const actions = {
  obtenerFormulario({commit, dispatch}) {
    return defaultServerCall(ReporteMedicoService.getForm(), {commit, dispatch}, {
      successMessage: '',
      errorMessage: 'No pudimos obtener el formulario en este momento. Por favor, inténtelo más tarde.',
      loadingMutation: 'SET_GET_LOADING',
    }).then(
      r => r.json().then(form => {
          commit('SET_FORM', form);
        })
    );
  },
  obtenerEsPrimeraVez({commit, dispatch}) {
    return defaultServerCall(ReporteMedicoService.getFirstTime(), {commit, dispatch}, {
      successMessage: '',
      loadingMutation: 'SET_FIRST_TIME_LOADING',
    }).then(r => {
      return r.json().then(
        obj => {
          commit("SET_ES_PRIMERA_VEZ", obj.firstTime);
          commit("SET_DEBE_REPORTAR_FIEBRE_AYER", obj.debeReportarFiebreAyer);
          return obj;
        }
      );
    });
  },
  enviarFormulario({commit, dispatch}, formulario) {
    return defaultServerCall(ReporteMedicoService.postForm(formulario), {commit, dispatch}, {
      successMessage: 'Estado de Salud recibido. ¡Muchas gracias!',
      loadingMutation: 'SET_ADD_LOADING',
    }).then(r => {
      r.json().then(repuesta => commit('SET_RECOMENDACIONES', repuesta.resultadoRecomendaciones))
    });
  },
  clearRecomendaciones({commit}) {
    commit('SET_RECOMENDACIONES', null);
  },
};

export const getters = {
  isAddLoading: state => state.loading.add,
  isGetLoading: state => state.loading.get || state.loading.firstTime,
};
