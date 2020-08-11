<template>
  <v-container fluid>
    <h2>Exámenes de laboratorio</h2>
    <GenericForm :fields="fields1" />
    <p><strong>Tipo de Muestra:</strong></p>
    <GenericForm :fields="fields2" />
  </v-container>
</template>

<script>
  import {fieldTypes, siNoOptions} from "./formConstants";
  import GenericForm from "../../components/generic-fields/GenericForm";

  const tiposMuestra = [
    'Hisopado nasal',
    'Hisopado faríngeo',
    'Aspirado nasofaríngeo',
    'Lavado Broncoalveolar',
    'Aspirado Traqueal',
    'Sangre',
    'Tejidos(Biopsia/Autopsia)',
  ];

  export default {
    name: "ExamenesLaboratorio",
    components: {GenericForm},
    data: () => ({
      fields1: [
        [
          {
            fieldName: 'tomaMuestra',
            fieldType: fieldTypes.Radio,
            optionsSource: siNoOptions,
            label: 'Toma de muestra',
            horizontal: true,
          },
          {
            fieldName: 'fechaRecepcionMuestra',
            fieldType: fieldTypes.Date,
            label: 'Fecha de recepcion de la muestra',
            inputLength: 25,
          },
          {
            fieldName: 'fechaRecepcionMuestra',
            fieldType: fieldTypes.Date,
            label: 'Fecha de resultado',
            inputLength: 25,
          },
        ],
      ],
      fields2: [
        ...tiposMuestra.map(
          tipo => {
            const fieldName = tipo.toLowerCase().trim().replace(/[^a-z]/g, '');
            return [
              {
                fieldName,
                fieldType: fieldTypes.Radio,
                horizontal: true,
                optionsSource: siNoOptions,
                label: tipo,
              },
              {
                fieldName: fieldName + 'FechaMuestra',
                fieldType: fieldTypes.Date,
                label: 'Fecha de toma de muestra',
                inputLength: 25,
              },
            ];
          }
        ),
        [
          {
            fieldName: 'otraMuestra',
            fieldType: fieldTypes.String,
            label: 'Otras muestras',
            hintText: 'Especificar',
          },
          {
            fieldName: 'otraMuestraSiNo',
            fieldType: fieldTypes.Radio,
            horizontal: true,
            optionsSource: siNoOptions,
          },
          {
            fieldName: 'otraMuestraFechaMuestra',
            fieldType: fieldTypes.Date,
            label: 'Fecha de toma de muestra',
            inputLength: 25,
          },
        ],
      ],
    }),

  }
</script>

<style scoped>

</style>
