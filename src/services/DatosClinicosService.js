import Vue from '../main';
export default {
  postDatoClinico(dato) {
    return Vue.$http.post('apicovid/rest/covid19/datos-clinicos', dato);
  }
}
