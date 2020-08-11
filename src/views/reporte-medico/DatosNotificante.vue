<template>
  <v-container fluid class="dato-notificante">
    <h2>Datos del notificante</h2>
    <GenericForm :fields="fields"/>
  </v-container>
</template>

<script>
  import TextField from "../../components/generic-fields/TextField";
  import GenericForm from "../../components/generic-fields/GenericForm";

  export default {
    name: "DatosNotificante",
    components: {
      GenericForm,
      TextField,
    },
    data: () => ({
      fields: [
        {
          fieldName: 'responsableNotificacion',
          fieldType: 'String',
          label: 'Responsable de la notificación',
          modelField: 'responsableNotificacion',
        },
        [
          {
            fieldName: 'establecimiento',
            fieldType: 'String',
            label: 'Establecimiento',
            modelField: 'establecimiento',
          },
          {
            fieldName: 'regionSanitaria',
            fieldType: 'String',
            label: 'Región Sanitaria',
            modelField: 'regionSanitaria',
          },
        ],
      ],
    }),
  }
</script>

<style scoped>

</style>
