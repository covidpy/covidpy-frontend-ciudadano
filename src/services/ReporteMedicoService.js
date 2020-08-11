import Vue from '../main';

export default {
  getForm() {
    return Vue.$http.get('/apicovid/rest/covid19/reporte-salud/form');
  },
  postForm(model) {
    return Vue.$http.post('/apicovid/rest/covid19/reporte-salud', model);
  },
  getFirstTime() {
    return Vue.$http.get('/apicovid/rest/covid19/reporte-salud/primera-vez');
  }
};
