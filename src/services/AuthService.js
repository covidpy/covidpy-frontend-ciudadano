import Vue from '../main';

export default {
  login(username, password) {
    return Vue.$http.post('/apicovid/rest/covid19/seguridad', {
      username,
      password,
    });
  },
  loginToken(oneTimeToken) {
    return Vue.$http.post('/apicovid/rest/covid19/seguridad', {
      oneTimeToken,
    });
  },
  recuperarClave(nroDocumento, celular) {
    return Vue.$http.post('/apicovid/rest/covid19/seguridad/recuperar-clave', {
      nroDocumento,
      celular
    });
  },
  cambiarClave(password, password2) {
    return Vue.$http.post('/apicovid/rest/covid19/seguridad/cambiar-clave', {
      password,
      password2
    });
  }
}
