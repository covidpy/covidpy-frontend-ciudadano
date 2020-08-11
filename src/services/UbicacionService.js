import Vue from '../main';

export default {
  postRegistroUbicacion(ubicacion) {
    return Vue.$http.post('/apicovid/rest/covid19/registro-ubicacion/', ubicacion);
  },
  getUbicacion() {
    return Vue.$getLocation({
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 30000,
    });
  },
  getLastSaved() {
    return Vue.$http.get('/apicovid/rest/covid19/registro-ubicacion/last');
  },
}
