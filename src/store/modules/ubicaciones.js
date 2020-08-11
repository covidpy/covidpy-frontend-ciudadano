import UbicacionService from "../../services/UbicacionService";
import {DEFAULT_ERROR_MESSAGE, STORAGE_PERMISO_UBICACION} from "../../constants";

export const namespaced = true;

export const state = {
  loading: false,
  dioPermiso: localStorage.getItem(STORAGE_PERMISO_UBICACION) === 'true',
  ubicacionDispositivo: null,
  errorUbicacion: false,
  ultimaUbicacion: null,
};

export const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_DIO_PERMISO(state, dioPermiso) {
    localStorage.setItem(STORAGE_PERMISO_UBICACION, dioPermiso);
    state.dioPermiso = dioPermiso;
  },
  SET_UBICACION(state, ubicacion) {
    state.ubicacionDispositivo = ubicacion;
  },
  SET_ERROR_UBICACION(state, error) {
    state.errorUbicacion = error;
  },
  SET_ULTIMA_UBICACION(state, ubicacion) {
    state.ultimaUbicacion = ubicacion;
  },
};

export const actions = {
  enviarUbicacion({commit, dispatch}, ubicacion) {
    commit('SET_LOADING', true);
    return UbicacionService.postRegistroUbicacion(ubicacion).then(
      () => {
        const snack = {
          type: 'success',
          message: '¡Gracias por compartir tu ubicación!',
        };
        dispatch('snackbars/add', snack, {root: true});
        commit('SET_LOADING', false);
      }
    ).catch(
      (err) => {
        if (err.status !== 401) {
          const snack = {
            type: 'error',
            message: DEFAULT_ERROR_MESSAGE,
          };
          dispatch('snackbars/add', snack, {root: true});
        }
        commit('SET_LOADING', false);
        throw err;
      },
    );
  },
  solicitarUbicacion({commit, dispatch}) {
    const snackLoading = dispatch('snackbars/add', {
      message: 'Obteniendo ubicación',
      permanent: true,
    }, {root: true});
    commit('SET_ERROR_UBICACION', false);
    return UbicacionService.getUbicacion().then(coordinates => {
        snackLoading.then(snack => {
          setTimeout(() => {
            dispatch('snackbars/remove', snack, {root: true});
          }, 500);
        });
        commit('SET_UBICACION', coordinates);
    }).catch( err => {
      snackLoading.then(snack => {
        dispatch('snackbars/remove', snack, {root: true});
      });
      dispatch('snackbars/add', {
        message: 'No se pudo obtener su ubicación, por favor, seleccione en el mapa',
        type: 'error',
      }, {root: true});
      commit('SET_ERROR_UBICACION', false);
      throw err;
    });
  },
  setDioPermiso({commit}, dioPermiso) {
    commit('SET_DIO_PERMISO', dioPermiso);
  },
  checkPermiso({commit, dispatch}) {
    return new Promise((resolve, reject) => {
      if (navigator.permissions) {
        navigator.permissions.query({name: 'geolocation'}).then(
          (permission) => {
            commit('SET_DIO_PERMISO', permission.state !== 'prompt');
            if (permission.state === 'denied') {
              dispatch('snackbars/add', {
                message: 'Haz denegado el permiso a tu ubicación a la App anteriormente. Marca tu ubicación con el marcador',
              }, {root: true});
            }
            resolve();
          }
        );
      } else {
        reject(new Error("Su dispositivo no soporta permisos."));
       }
    });
  },
  obtenerUltimaUbicacion({commit}) {
    return UbicacionService.getLastSaved().then(
      (r) => {
        r.json().then(
          ubi => commit('SET_ULTIMA_UBICACION', ubi)
        );
      }
    );
  },
};
