export default {
  props: {
    baseUrl: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: false
    },
  },
  data: () => ({
    mostrarConfirmacionBorrar: false,
    borrando: false,
  }),
  methods: {
    borrarRegistro () {
      this.mostrarConfirmacionBorrar = false;
      this.borrando = true;
      this.$http.delete(
        `${process.env.VUE_APP_ROOT_API}${this.baseUrl}/${this.id}`
      ).then(() => {
        this.borrando = false;
        this.onBorradoExitoso();
      }, (error) => {
        this.borrando = false;
        if (this.snackbar) {
          this.snackbar.message = error.status === 400 ? error.body.errorMessage : 'Ocurrió un error al intentar eliminar';
          this.snackbar.duration = 5000;
          this.snackbar.visible = true;
          this.snackbar.color = 'error';
        }
      });
    },
    onBorradoExitoso() {
    },
  },
}