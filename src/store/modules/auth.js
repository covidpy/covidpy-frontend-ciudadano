import {DEFAULT_ERROR_MESSAGE, STORAGE_CAMBIAR_PASS, STORAGE_TOKENS, STORAGE_USUARIO} from "../../constants";
import AuthService from "../../services/AuthService";
import {defaultServerCall } from "../store";

function handleLogin(promise, {commit, dispatch}) {
  commit('SET_LOADING', true);
  commit('SET_VALIDACION', {});
  return promise.then(
    (r) => {
      r.json().then(
        (authResponse) => {
          commit('SET_USUARIO', authResponse.usuario);
          commit('SET_TOKEN', authResponse.token);
          commit('SET_LOADING', false);
          const snack = {
            type: 'success',
            message: authResponse.usuario.nombre ? `¡Bienvenido/a ${authResponse.usuario.nombre}!` : '¡Bienvenido!',
          };
          dispatch('snackbars/add', snack, {root: true});
        });
    }
  ).catch(
    (err) => {
      commit('SET_LOADING', false);
      const snack = {
        type: 'error',
        message: err.status === 401 ?  `Credenciales inválidas`: DEFAULT_ERROR_MESSAGE,
      };
      dispatch('snackbars/add', snack, {root: true});
      throw err;
    });

}

export const namespaced = true;

export const state = {
  usuario: window.localStorage.getItem(STORAGE_USUARIO) ? JSON.parse(window.localStorage.getItem(STORAGE_USUARIO)) : null,
  token: window.localStorage.getItem(STORAGE_TOKENS),
  loading: false,
  cambiarPass: localStorage.getItem(STORAGE_CAMBIAR_PASS) === 'true',
  validacion: {},
  isFlutter: false,
};

export const mutations = {
  SET_USUARIO(state, usuario) {
    state.usuario = usuario;
    if (usuario) {
      window.localStorage.setItem(STORAGE_USUARIO, JSON.stringify(usuario));
    } else {
      window.localStorage.removeItem(STORAGE_USUARIO);
    }
  },
  SET_TOKEN(state, token) {
    state.token = token;
    if (token) {
      window.localStorage.setItem(STORAGE_TOKENS, token);
    } else {
      window.localStorage.removeItem(STORAGE_TOKENS);
    }
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_VALIDACION(state, validacion) {
    state.validacion = validacion;
  },
  SET_CAMBIAR_PASS(state, cambiarPass) {
    window.localStorage.setItem(STORAGE_CAMBIAR_PASS, cambiarPass);
    state.cambiarPass = cambiarPass;
  },
  SET_IS_FLUTTER(state, isFlutter) {
    state.isFlutter = isFlutter;
  },
};

export const actions = {
  login({commit, dispatch}, {username, password}) {
    return handleLogin(AuthService.login(username, password), {commit, dispatch});
  },
  loginConToken({commit, dispatch}, token) {
    return handleLogin(AuthService.loginToken(token), {commit, dispatch});
  },
  logout({commit, state}) {
    commit('SET_USUARIO', null);
    commit('SET_TOKEN', null);
    commit('contactos/SET_CONTACTOS', [], {root: true});
    commit('contactos/SET_CONTACTO', {}, {root: true});
    commit('datosBasicos/SET_DATOS_BASICOS', {}, {root: true});
    commit('datosBasicos/SET_DIAS_CUARENTENA', null, {root: true});
    commit('notificaciones/SET_NOTIFICACIONES', null, {root: true});
    commit('notificaciones/SET_NOTIFICACION', {}, {root: true});
    commit('reporteMedico/SET_ES_PRIMERA_VEZ', false, {root: true});
    commit('reporteMedico/SET_RECOMENDACIONES', null, {root: true});
    commit('ubicaciones/SET_ULTIMA_UBICACION', null, {root: true});
    /*if (state.isFlutter) {
      window.open(process.env.VUE_APP_FLUTTER_LOGOUT_DEEP_LINK, '_self');
    }*/
  },
  cambiarClave({commit, dispatch}, {password, password2}) {
    return defaultServerCall(
      AuthService.cambiarClave(password, password2),
      {commit, dispatch},
      {
        successMessage: '¡Contraseña cambiada exitosamente!',
      },
    );
  },
  recuperarClave({commit, dispatch}, {nroDocumento, celular}) {
    return defaultServerCall(
      AuthService.recuperarClave(nroDocumento, celular), {commit, dispatch},
      {
        successMessage: 'Se le enviará un SMS con las instrucciones. ¡Muchas gracias!',
      }
    );
  },
  setCambiarPass({commit}, cambiarPass) {
    commit('SET_CAMBIAR_PASS', cambiarPass);
  },
  setToken({commit}, token) {
    commit('SET_TOKEN', token);
  },
  isFlutter({commit}){
    commit('SET_IS_FLUTTER', true);
  },
};

export const getters = {
  isLoggedIn: (state) => !!state.token,
  isFlutterLogin: (state) => state.isFlutter
};
