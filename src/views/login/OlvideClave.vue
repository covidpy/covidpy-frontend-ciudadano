<template>
  <v-container class="pa-0">
    <v-form @submit.prevent="submit()">
      <GenericForm :fields="fields" no-gutters v-model="model" :error-messages="validacion" />
      <v-btn color="white" class="ma-0 accent" :loading="loading" text style="width: 100%" type="submit"
      >Recuperar contraseña
      </v-btn>
      <v-btn text
             :to="{name: 'home'}"
             exact
             color="white"
             class="ma-0 mt-4 primary--text" style="width: 100%" :disabled="loading" type="button"
      >Cancelar
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
  import GenericForm from "../../components/generic-fields/GenericForm";
  import {fieldTypes} from "../reporte-medico/formConstants";
  import {mapActions, mapState} from "vuex";
  export default {
    name: "OlvideClave",
    components: {GenericForm},
    methods: {
      ...mapActions('auth', ['recuperarClave']),
      submit() {
        this.recuperarClave(this.model).then(() => {
          this.$router.push({name: 'login'});
        }, () => {});
      },
    },
    computed: {
      ...mapState('auth', ['loading', 'validacion']),
    },
    data: () => ({
      model: undefined,
      fields: [
        {
          fieldName: 'nroDocumento',
          label: 'Nro. de Documento',
          fieldType: fieldTypes.String,
          icon: 'description',
        },
        {
          fieldName: 'celular',
          label: 'Nro. de Celular',
          fieldType: fieldTypes.String,
          icon: 'smartphone',
        },
      ],
    }),
  }
</script>

<style scoped>

</style>
