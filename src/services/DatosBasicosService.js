import Vue from "../main";

export default {

  getDatosBasicos() {
    return Vue.$http.get('/apicovid/rest/covid19/datos-basicos');
  },
  putDatoBasico(datoBasico) {
    return Vue.$http.put('/apicovid/rest/covid19/datos-basicos/', datoBasico);
  },
  getDiasAislamiento() {
    return Vue.$http.get('/apicovid/rest/covid19/datos-basicos/dias-cuarentena');
  },
}
