import Vue from "../main";

export default {
    notificaciones : [
            {
              id: 0,
              mensaje: 'Usted debe registrar su ubicación',
              fecha: '2020-03-19T13:00:00'
            },
            {
              id: 2,
              mensaje: 'Usted debe registrar su ubicación',
              fecha: '2020-03-19T13:10:00'
            },
            {
              id: 1,
              mensaje: 'Registro de ubicación exitoso',
              fecha: '2020-03-19T13:14:31'
            },
            {
              id: 3,
              mensaje: 'Buen día, nos comunicamos con usted para informarle que en esta mañana ',
              fecha: '2020-03-19T13:14:31'
            },
          ],

    getNotificaciones() {
        return Vue.$http.get('/apicovid/rest/covid19/notificaciones/all');
    },
    getNotificacionById(id) {
        return Vue.$http.get('/apicovid/rest/covid19/notificaciones/' + id );
    },
    marcarVisto(id) {
        return Vue.$http.post('/apicovid/rest/covid19/notificaciones/'+ id + '/visto');
    }
}
