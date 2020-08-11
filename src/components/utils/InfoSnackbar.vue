<template>
  <v-snackbar
      :timeout="snackbar.duration"
      bottom left
      v-model="snackbar.visible"
      :color="snackbar.color"
  >{{snackbar.message}}
  </v-snackbar>
</template>

<script>
export default {
  name: 'InfoSnackbar',
  props: {
    snackbar: {
      type: Object,
      default: () => ({
        message: '',
        visible: false,
        color: '',
        duration: 1500
      })
    }
  }
};
</script>

<style scoped>

</style>
