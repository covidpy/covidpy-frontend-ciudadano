import NotificacionesService from "../../services/NotificacionesService";
import Vue from "../../main";

export const namespaced = true;

export const state = {
  notificaciones: null,
  notificacion: {},
  loading: {
    list: false,
    form: false,
    get: false,
  },
};

export const mutations = {
  SET_NOTIFICACIONES(state, notificaciones) {
    state.notificaciones = notificaciones;
  },
  SET_NOTIFICACION(state, notificacion) {
    state.notificacion = notificacion;
  },
  SET_LOADING_LIST(state, loading) {
    state.loading.list = loading;
  },
  SET_LOADING_GET(state, loading) {
    state.loading.get = loading;
  },
  SET_NOTIFICACION_VISTA(state, id) {
    const idx = state.notificaciones.findIndex(n => n.id === id);
    if (idx >= 0 && state.notificaciones) {
      state.notificaciones[idx].visto = true;
    }
  },
};

export const actions = {
  obtenerNotificaciones({commit, dispatch, state}, showLoading) {
    commit('SET_LOADING_LIST', showLoading);
    NotificacionesService.getNotificaciones().then(
      (r) => {
        r.json().then(
            notificaciones => {
              if (
                Vue.$route.name !== 'lista-notificaciones' &&
                (
                  state.notificaciones ?
                    state.notificaciones.length < notificaciones.length :
                    notificaciones.some(n => !n.visto)
                )
              ) {
                dispatch('snackbars/add', {
                  message: 'Tiene nuevos mensajes',
                  action: {
                    title: 'VER',
                    handler: (snack) => {
                      Vue.$router.push({name: 'lista-notificaciones'});
                      dispatch('snackbars/remove', snack, {root: true});
                    },
                  },
                }, {root: true});
              }
              commit('SET_NOTIFICACIONES', notificaciones);
              commit('SET_LOADING_LIST', false);
            });
      }).catch(
        (err) => {
          commit('SET_LOADING_LIST', false);
          // if (err.status !== 401) {
          //   const snack = {
          //     type: 'error',
          //     message: `No se pudo obtener la lista`,
          //   };
          //   dispatch('snackbars/add', snack, {root: true});
          // }
          throw err;
        }
    );
  },
  getNotificacion({commit, dispatch}, id) {
    commit('SET_LOADING_GET', true);
    return NotificacionesService.getNotificacionById(id).then((r) => {
      r.json().then(notificacion => {
        commit('SET_NOTIFICACION', notificacion);
        commit('SET_LOADING_GET', false);
      });
    }).catch(
        (err) => {
          commit('SET_LOADING_GET', false);
          const snack = {
            type: 'error',
            message: `No se pudo obtener el registro`,
          };
          dispatch('snackbars/add', snack, {root: true});
        }
    );
  },
  marcarVisto({commit}, id) {
    return NotificacionesService.marcarVisto(id)
        .then(res => {
          commit('SET_NOTIFICACION_VISTA', id);
        }).catch(
            (err) => {
              throw err;
            }
        );
  },
};

export const getters = {
  isListLoading: state => state.loading.list,
  isAddLoading: state => state.loading.add,
  isGetLoading: state => state.loading.get,
  cantidadMensajesNuevos: state => state.notificaciones ?
    state.notificaciones.filter(noti => !noti.visto).length : 0,
};
