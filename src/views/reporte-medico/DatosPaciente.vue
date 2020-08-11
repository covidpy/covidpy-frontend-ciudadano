<template>
  <v-container fluid class="datos-paciente">
    <h2>Datos del paciente</h2>
    <GenericForm :fields="fields" />
  </v-container>
</template>

<script>
  import TextField from "../../components/generic-fields/TextField";
  import DateField from "../../components/generic-fields/DateField";
  import GenericForm from "../../components/generic-fields/GenericForm";

  export default {
    name: "DatosPaciente",
    components: {
      GenericForm,
      TextField,
      DateField,
    },
    data: () => ({
      fields: [
        {
          fieldName: 'nombreApellido',
          fieldType: 'String',
          label: 'Nombres y Apellidos',
        },
        [
          {
            fieldName: 'cedula',
            fieldType: 'String',
            label: 'Documento de Identidad n°',
          },
          {
            fieldName: 'tipoCedula',
            fieldType: 'Radio',
            optionsSource: [
              {
                id: 0,
                descripcion: 'Cédula de Identidad'
              },
              {
                id: 1,
                descripcion: 'Pasaporte'
              },
            ],
          },
        ],
        [
          {
            fieldName: 'edad',
            fieldType: 'Int',
            label: 'Edad',
          },
          {
            fieldName: 'sexo',
            fieldType: 'Radio',
            label: 'Sexo',
            optionsSource: [
              {
                id: 0,
                descripcion: 'Masculino'
              },
              {
                id: 1,
                descripcion: 'Femenino'
              },
            ],
          },
          {
            fieldName: 'fechaNacimiento',
            fieldType: 'Date',
            label: 'Fecha de Nacimiento',
            inputLength: 20,
          },

        ],
      ],
    }),
  }
</script>

<style scoped>

</style>
