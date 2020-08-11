<template>
  <v-container fluid  class="mb-6">
    <v-row>
      <v-col cols="12">
    <p class="text--secondary">Temperatura (Requerido)</p>
    <v-slider
        :min="minTemp"
        :max="maxTemp"
        :step="stepTemp"
        color="primary"
        v-if="model"
        v-model="model.sintomasFiebreValor"
        thumb-label="always">
      <template v-slot:prepend>
        <v-icon :disabled="model.sintomasFiebreValor === minTemp" color="primary" @click="disminuirTemp">remove</v-icon>
      </template>
      <template v-slot:append>
        <v-icon :disabled="model.sintomasFiebreValor === maxTemp" color="primary" @click="aumentarTemp">add</v-icon>
      </template>

    </v-slider>
      </v-col>
    </v-row>
    <GenericForm
        v-model="model"
        :fields="fields" />
    <v-btn
        dark
        fixed
        fab
        right
        bottom
        title="Guardar"
        color="secondary"
        :loading="loading"
        @click="solicitarConfirmacion()"
    >
      <v-icon>send</v-icon>
    </v-btn>

    <v-dialog v-model="showEstaSeguro">
      <v-card>
        <v-card-title>Enviar datos clínicos</v-card-title>
        <v-card-text>Está seguro que desea enviar sus datos?</v-card-text>
        <v-card-actions>
          <v-divider />
          <v-btn text @click="showEstaSeguro = false">Cancelar</v-btn>
          <v-btn text color="accent" @click="send()">Enviar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import GenericForm from "../../components/generic-fields/GenericForm";
  import {fieldTypes, renderSiNo} from "./formConstants";
  import {mapActions, mapState} from "vuex";
  import {flattenFields} from "../../components/utils/utils";

  const temperaturaFiebre = 37.5;
  export default {
    name: "DatosClinicos",
    components: {
      GenericForm,
    },
    data: () => ({
      fields: [
        ...[
          ['Tuvo tos?', 'sintomasTos'],
          ['Tuvo dolor de garganta?', 'sintomasDifRespirarDolorGarganta'],
          ['Tuvo alguna dificulad respiratoria?', 'sintomasDificultadRespirar'],
        ].map(s => [renderSiNo(s[0], s[1])]),
        [
          ['Falta de Aire', 'sintomasDifRespirarFaltaAire'],
          ['Cansancio al caminar', 'sintomasDifRespirarCansancioCaminar'],
          ['Rinorrea', 'sintomasDifRespirarRinorrea'],
          ['Congestión nasal', 'sintomasDifRespirarCongestionNasal'],
        ].map(s => ({
          fieldName: s[1],
          fieldType: fieldTypes.Bool,
          label: s[0],
        })),
        renderSiNo('Tuvo diarrea?', 'sintomasDiarrea'),
        {
          fieldName: 'sintomasOtros',
          fieldType: 'String',
          label: 'Otros síntomas',
        },
      ],
      model: undefined,
      showEstaSeguro: false,
      minTemp: 35,
      maxTemp: 43,
      stepTemp: 0.1,
    }),
    methods: {
      ...mapActions('datosClinicos', ['enviarDatosClinicos']),
      ...mapActions('snackbars', {addSnackbar: 'add'}),
      solicitarConfirmacion() {
        let fields = flattenFields(this.fields);
        if (this.model && fields.filter(f => !f.disabled && f.isRequired).every(f => {
          const value = this.model[f.fieldName];
          return value !== null && value !== undefined;
        })) {
          this.showEstaSeguro = true;
        } else {
          this.addSnackbar({
            type: 'warning',
            message: 'Debe completar todos los campos requeridos',
          });
        }
      },
      send() {
        this.model.sintomasFiebre = Number(this.model.sintomasFiebreValor) >= temperaturaFiebre;
        this.showEstaSeguro = false;
        this.enviarDatosClinicos(this.model).then(() => {
          this.$router.push({name: 'home'});
        }, () => {});
      },
      disminuirTemp() {
        this.model.sintomasFiebreValor -= 0.1;
      },
      aumentarTemp() {
        this.model.sintomasFiebreValor += 0.1;
      },
    },
    computed: {
      ...mapState('datosClinicos', ['loading']),
    },
  }
</script>

<style scoped>

</style>
