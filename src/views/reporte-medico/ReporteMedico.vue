<template>
  <v-container fluid class="pa-0">
    <v-row v-if="!recomendaciones">
      <v-col>
        <h2 class="primary--text" style="opacity: .87">
          Actualizar estado de salud
        </h2>
        <v-divider/>
      </v-col>
    </v-row>
    <ErrorForm
        @retry="obtenerFormulario()"
        v-if="!isGetLoading && !form" />

    <Recomendaciones v-if="recomendaciones"
                     @home="goHome()"
                     :recomendaciones="recomendaciones" />

    <v-form v-if="!recomendaciones" @submit.prevent="onFormSubmit()">
      <template v-if="form">
      <v-row justify="center"  class="mb-3" dense>
        <v-col cols="auto" v-for="idx in totalPages" :key="'col' + idx">
          <v-sheet class="page-indicator"
                   height="16"
                   width="16"
                   @click="currentStep = idx"
                   :color="currentStep === idx ? 'accent': 'grey lighten-2'"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
        <v-expand-transition>
          <PagedGenericForm
                            class="fill-height"
                            no-header
                            :step.sync="currentStep"
                            v-on:update:pageNumber="totalPages = $event"
                            :fields="form"
                            v-model="model" :error-messages="validacion"/>
        </v-expand-transition>
        </v-col>
        <v-row align="end" class="flex-nowrap pl-2" style="max-width: 100%">
          <v-col cols="auto">
            <v-btn text
                   class="text-left"
                   :disabled="currentStep === 1 || isAddLoading"
                   @click="currentStep--"
                   type="button"
                   color="accent"><v-icon>keyboard_arrow_left</v-icon> Anterior</v-btn>
          </v-col>
          <v-spacer />
          <v-col cols="auto">
            <v-btn text
                   :loading="isAddLoading"
                   class="pr-0 text-right"
                   type="submit"
                   color="accent">{{currentStep === totalPages ? 'Enviar' : 'Siguiente' }} <v-icon>keyboard_arrow_right</v-icon></v-btn>
          </v-col>
        </v-row>
      </v-row>
      </template>
      <v-fade-transition>
      <v-skeleton-loader
          v-if="isGetLoading"
          type="card"
      /></v-fade-transition>

      <v-dialog
          max-width="360px"
          v-model="showEstaSeguro">
        <v-card>
          <v-card-title>Enviar estado de salud</v-card-title>
          <v-card-text>¿Completó todos los campos correctamente?</v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn text @click="showEstaSeguro = false">No, cancelar</v-btn>
            <v-btn text color="accent" @click="send">Sí, enviar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </v-container>
</template>
<script>
  import {mapActions, mapGetters, mapState} from "vuex";
  import PagedGenericForm from "../../components/generic-fields/PagedGenericForm";
  import Recomendaciones from "./Recomendaciones";
  import ErrorForm from "./ErrorForm";

  export default {
  name: 'ReporteMedico',
  components: {Recomendaciones, PagedGenericForm, ErrorForm, },
  data: () => ({
    totalPages: null,
    model: undefined,
    showEstaSeguro: false,
    currentStep: 1,
  }),
  mounted() {
    this.clearRecomendaciones();
    Promise.all([
      this.obtenerFormulario(),
      this.obtenerEsPrimeraVez(),
    ]).then(() => this.$nextTick().then(() => {
      this.model.esPrimeraVez = this.esPrimeraVez.toString();
      this.model.debeReportarFiebreAyer = this.debeReportarFiebreAyer.toString();
    }));
  },
  methods: {
    onFormSubmit() {
      if (this.currentStep === this.totalPages) {
        this.showEstaSeguro = true;
      } else {
        this.currentStep++;
        this.$vuetify.goTo(0);
      }
    },
    send() {
      this.showEstaSeguro = false;
      this.enviarFormulario(this.model);
    },
    goHome() {
      this.clearRecomendaciones();
      const routeName = 'actualizar-ubicacion';
      this.$router.push({name: routeName});
    },
    ...mapActions(
      'reporteMedico',
      [
        'obtenerFormulario',
        'enviarFormulario',
        'obtenerEsPrimeraVez',
        'clearRecomendaciones',
      ]
    )
  },
  computed: {
    ...mapState('reporteMedico', ['paso', 'form', 'validacion', 'esPrimeraVez', 'recomendaciones', 'debeReportarFiebreAyer']),
    ...mapGetters('reporteMedico', ['isAddLoading', 'isGetLoading']),
  },
};
</script>

<style scoped>

  .page-indicator {
    border-radius: 50%;
  }

</style>
