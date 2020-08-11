<template>
  <p class="text-xs-center">
    <v-icon large color="error">error</v-icon>
    <br/>
    <span>{{message}}</span><br/>
    <v-btn @click="$emit('refresh')">
      <v-icon>refresh</v-icon>
      Reintentar
    </v-btn>
  </p>
</template>

<script>
export default {
  name: 'ErrorMessage',
  props: {
    message: {
      type: String
    }
  }
};
</script>

<style scoped>

</style>
