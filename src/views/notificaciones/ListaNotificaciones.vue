<template>
  <div>
  <v-list v-if="notificaciones.length > 0">
    <template
        v-for="(notificacion, idx) in notificaciones"
    >
      <v-list-item
          :key="notificacion.id"
          @click="$router.push({name: 'detalle-notificaciones',  params:  {id: notificacion.id}})"
          :class="{'font-weight-bold' : !notificacion.visto}"
      >
        <v-list-item-avatar>
          <v-icon>{{notificacion.visto ? 'drafts' : 'mail'}}</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{notificacion.remitente}}</v-list-item-title>
          <v-list-item-subtitle>
            {{notificacion.mensaje}}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-icon style="font-size: small">
          {{isToday(notificacion.fechaNotificacion) ?
          notificacion.fechaNotificacion.substring(11) : notificacion.fechaNotificacion.substring(0, 10)}}
        </v-list-item-icon>
      </v-list-item>
      <v-divider :key="'divider' + idx"/>
    </template>
  </v-list>

    <v-container v-else-if="!isListLoading">
      <v-row class="text-center"
             style="opacity: 0.52;"
             no no-gutters>
        <v-col cols="12">
          <v-icon size="100px" color="primary">notifications_off</v-icon>
        </v-col>
        <v-col cols="12">
          <h1 class="primary--text">Usted no tiene mensajes</h1>
        </v-col>
      </v-row>
    </v-container>
    <ListLoading avatar v-else/>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState} from "vuex";
  import ListLoading from "../../components/loading/ListLoading";

  export default {
    name: "ListaNotificaciones",
    components: {ListLoading},
    data: () => ({
      hoy: new Date(),
    }),
    mounted() {
      this.obtenerNotificaciones(true);
    },
    computed: {
      ...mapState({
        notificaciones: state => state.notificaciones.notificaciones
      }),
      ...mapGetters('notificaciones', ['isListLoading']),
    },
    methods: {
      ...mapActions('notificaciones', ['obtenerNotificaciones']),
      isToday(date) {
        const fecha = date.substring(0, 10);
        const fechaSplit = fecha.split("/");
        return this.hoy.getDate() === Number(fechaSplit[0]) &&
            this.hoy.getMonth() + 1 === Number(fechaSplit[1]) &&
            this.hoy.getFullYear() === Number(fechaSplit[2]);
      },
    },
  }
</script>

<style scoped>

</style>
