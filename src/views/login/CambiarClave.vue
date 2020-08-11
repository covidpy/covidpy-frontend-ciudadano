<template>
  <v-container class="pa-0">
    <v-form @submit.prevent="submit()">
      <GenericForm :fields="fields" no-gutters v-model="model" :error-messages="validacion" />
      <v-btn color="white" class="ma-0 accent" text style="width: 100%" :loading="loading" type="submit"
      >Cambiar contraseña
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
  import {mapActions, mapState} from "vuex";
  import {fieldTypes} from "../reporte-medico/formConstants";
  import GenericForm from "../../components/generic-fields/GenericForm";

  export default {
    name: "CambiarClave",
    components: {GenericForm},
    methods: {
      ...mapActions('auth', ['cambiarClave', 'logout', 'setCambiarPass']),
      submit() {
        this.cambiarClave(this.model).then(() => {
          this.logout();
          this.setCambiarPass(false);
          this.$router.replace({name: 'login'});
        }, () => {});
      },
    },
    computed: {
      ...mapState('auth', ['loading', 'validacion']),
    },
    mounted() {
      this.$nextTick().then(() => {
        this.setCambiarPass(true);
      });
    },
    data: () => ({
      model: undefined,
      fields: [
        {
          fieldName: 'password',
          label: 'Contraseña',
          fieldType: fieldTypes.Password,
          icon: 'lock',
        },
        {
          fieldName: 'password2',
          label: 'Confirmar Contraseña',
          fieldType: fieldTypes.Password,
          icon: 'lock',
        },
      ],
    }),
  }
</script>

<style scoped>

</style>
