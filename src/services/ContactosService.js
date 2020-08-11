import Vue from "../main";

export default {
  getContactos() {
    return Vue.$http.get('/apicovid/rest/covid19/contactos/all');
  },
  addContacto(contacto) {
    return Vue.$http.post('/apicovid/rest/covid19/contactos/', contacto);
  },
  editContacto(contacto, id) {
    return Vue.$http.post('/apicovid/rest/covid19/contactos/' + id, contacto);
  },
  getContactoById(id) {
    return Vue.$http.get('/apicovid/rest/covid19/contactos/' + id );
  },
}
