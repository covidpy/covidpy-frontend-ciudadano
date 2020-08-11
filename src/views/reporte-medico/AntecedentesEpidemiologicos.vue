<template>
  <v-container fluid>
    <h2>Antecedentes Epidemiológicos</h2>
    <GenericForm :fields="fields" />
  </v-container>
</template>

<script>
  import GenericForm from "../../components/generic-fields/GenericForm";
  import {siNoOptions} from "./formConstants";
  export default {
    name: "AntecedentesEpidemiologicos",
    components: {GenericForm},
    data: () => ({
      fields: [
        {
          fieldName: 'viajadoFuera',
          fieldType: 'Radio',
          horizontal: true,
          label: 'Ha viajado o residido en una zona de riesgo conocida fuera del país en los últimos 14 días previos al inicio de síntomas?',
          optionsSource: siNoOptions,
        },
        [
          {
            fieldName: 'lugarViajeFuera',
            fieldType: 'String',
            label: 'Dónde?',
            hintText: '(País y ciudad) Si ha visitado más de un sitio, liste todos los visitados en los últimos 14 días.',
            inputLength: 50,
          },
          {
            fieldName: 'desdeFechaViajeFuera',
            fieldType: 'Date',
            label: 'Desde',
          },
          {
            fieldName: 'hastaFechaViajeFuera',
            fieldType: 'Date',
            label: 'Hasta',
          },
        ],
        [
          {
            fieldName: 'medioTransporteViaje',
            fieldType: 'CheckList',
            horizontal: true,
            optionsSource: [
              {id: 0, descripcion: 'Viajó en avión'},
              {id: 1, descripcion: 'Barco'},
              {id: 2, descripcion: 'Ómnibus'},
            ],
          },
          {
            fieldName: 'companiaTransporte',
            fieldType: 'String',
            label: 'Compañía de Transporte',
            inputLength: 30,
          },
        ],
        [
          {
            fieldName: 'nroAsiento',
            fieldType: 'String',
            label: 'Asiento N°'
          },
          {
            fieldName: 'verificarTicket',
            fieldType: 'Radio',
            horizontal: true,
            label: 'Verificar Ticket de viaje: Verificado:',
            optionsSource: siNoOptions,
          },
        ],
      ],
    }),
  }
</script>

<style scoped>

</style>
