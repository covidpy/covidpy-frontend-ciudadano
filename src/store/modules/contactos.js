import ContactosService from "../../services/ContactosService";
import {DEFAULT_ERROR_MESSAGE} from "../../constants";
import NotificacionesService from "../../services/NotificacionesService";

export const namespaced = true;

export const state = {
  contactos: [],
  loading: {
    list: false,
    form: false,
    get: false,
  },
  errores: {},
  contacto: {},
};

export const mutations = {
  SET_CONTACTOS(state, contactos) {
    state.contactos = contactos;
  },
  ADD_CONTACTO(state, contacto) {
    state.contactos.push(contacto);
  },
  SET_CONTACTO(state, contacto) {
    state.contacto = contacto;
  },
  SET_LOADING_LIST(state, loading) {
    state.loading.list = loading;
  },
  SET_LOADING_FORM(state, loading) {
    state.loading.form = loading;
  },
  SET_ERRORES(state, errores) {
    state.errores = errores;
  },
  SET_LOADING_GET(state, loading) {
    state.loading.get = loading;
  },
};

export const actions = {
  obtenerContactos({commit, dispatch}) {
    commit('SET_LOADING_LIST', true);
    ContactosService.getContactos().then(
        (r) => {
          r.json().then(
            contactos => {
              commit('SET_CONTACTOS', contactos);
              commit('SET_LOADING_LIST', false);
          });
        }).catch(
        (err) => {
          commit('SET_LOADING_LIST', false);
          if (err.status !== 401) {
            const snack = {
              type: 'error',
              message: `No se pudo obtener la lista`,
            };
            dispatch('snackbars/add', snack, {root: true});
          }
          throw err;
        }
    );
  },
  agregarContacto({commit, dispatch}, contacto) {
    commit('SET_LOADING_FORM', true);
    commit('SET_ERRORES', {});
    return ContactosService.addContacto(contacto)
        .then(contacto => {
          commit('ADD_CONTACTO', contacto);
          commit('SET_LOADING_FORM', false);
          const snack = {
            type: 'success',
            message: '¡Guardado correctamente!',
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
            commit('SET_LOADING_FORM', false);
          }
          throw err;
        },
      );
  },
  editarContacto({commit, dispatch}, {contacto, id}) {
    commit('SET_LOADING_FORM', true);
    commit('SET_ERRORES', {});
    return ContactosService.editContacto(contacto, id)
        .then(contacto => {
          commit('ADD_CONTACTO', contacto);
          commit('SET_LOADING_FORM', false);
          const snack = {
            type: 'success',
            message: '¡Guardado correctamente!',
            permanent: true,
          };
          dispatch('snackbars/add', snack, {root: true});
        }).catch(
            (err) => {
              let message = '';
              if (err.status === 400) {
                commit('SET_ERRORES', err.body);
                message = 'Tiene errores en su formulario';
              } else {
                message = DEFAULT_ERROR_MESSAGE;
              }
              const snack = {
                type: 'error',
                message: message,
              };
              dispatch('snackbars/add', snack, {root: true});
              commit('SET_LOADING_FORM', false);
              throw err;
            },
        );
  },
  getContacto({commit, dispatch}, id) {
    commit('SET_LOADING_GET', true);
    return ContactosService.getContactoById(id).then((r) => {
      r.json().then(contacto => {
        commit('SET_CONTACTO', contacto);
        commit('SET_LOADING_GET', false);
      });
    }).catch(
        (err) => {
          commit('SET_LOADING_GET', false);
          const snack = {
            type: 'error',
            message: `No se pudo obtener el contacto`,
          };
          dispatch('snackbars/add', snack, {root: true});
        }
    );
  }
};

export const getters = {
  isListLoading: state => state.loading.list,
  isAddLoading: state => state.loading.add,
  isGetLoading: state => state.loading.get,
  isFormLoading: state => state.loading.form,
};
