<template>
  <v-container fluid>
  <v-list v-if="!isListLoading">
    <template
        v-for="(contacto, idx) in contactos"
    >
      <v-list-item
          :key="contacto.id"
          @click="$router.push({name: 'editar-contacto',  params:  {id: contacto.id}})"
      >
        <v-list-item-avatar>
          <v-icon>perm_identity</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-html="contacto.nombres + ' ' + contacto.apellidos"/>
          <v-list-item-subtitle v-if="contacto.fechaUltimoContacto">
            Contacto: {{contacto.fechaUltimoContacto}}
          </v-list-item-subtitle>
          <v-list-item-subtitle v-if="contacto.nroDocumento">
            Número de Documento: {{contacto.nroDocumento}}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider :key="'divider' + idx"/>
    </template>
  </v-list>
    <v-container v-if="!isListLoading && contactos && contactos.length === 0">
      <v-row class="text-center"
             style="opacity: 0.52;"
             no no-gutters>
        <v-col cols="12">
          <v-icon size="100px" color="primary">perm_identity</v-icon>
        </v-col>
        <v-col cols="12">
          <p class="primary--text">
            Aquí puedes reportar las personas con las que tuviste contacto físico en las últimas semanas, presionando el botón <v-icon>add</v-icon>
          </p>
        </v-col>
      </v-row>
    </v-container>
    <router-view name="nuevo-contacto" />
    <ListLoading avatar v-if="isListLoading"/>
    <v-btn
        fixed
        dark
        fab
        bottom right
        type="button"
        title="Nuevo"
        color="secondary"
        :to="{name: 'nuevo-contacto'}"
        >
      <v-icon>add</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
  import {mapActions, mapGetters, mapState} from "vuex";
  import ListLoading from "../../components/loading/ListLoading";

  export default {
    name: "ListaContactos",
    components: {ListLoading},
    mounted() {
      this.obtenerContactos();
    },
    computed: {
      ...mapState({
        contactos: state => state.contactos.contactos
      }),
      ...mapGetters('contactos', ['isListLoading']),
    },
    methods: {
      ...mapActions('contactos', ['obtenerContactos']),
    },
  }
</script>

<style scoped>

</style>
