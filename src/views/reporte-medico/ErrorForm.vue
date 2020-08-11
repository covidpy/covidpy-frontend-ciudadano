<template>
  <v-row justify="center" no-gutters>
    <v-col cols="12" class="text-center text--secondary">
      <v-icon x-large color="error">priority_high</v-icon>
    </v-col>
    <v-col cols="12" class="text-center text--secondary">
      <p>{{message}}</p>
    </v-col>
    <v-col cols="12" class="text-center">
      <v-btn text color="accent" @click="$emit('retry')">Reintentar</v-btn>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: "ErrorForm",
    props: {
      message: {
        type: String,
        default: 'No pudimos obtener el formulario. Por favor, comprueba tu conexión a Internet e inténtalo de nuevo',
      },
    },
  }
</script>

<style scoped>

</style>
