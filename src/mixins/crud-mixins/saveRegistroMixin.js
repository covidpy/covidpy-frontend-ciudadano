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
    formModel: undefined,
    erroresValidacion: {},
    guardando: false,
  }),
  methods: {
    guardarForm () {
      let formModel = this.getFormModel();
      this.guardando = true;
      let savePromise = this.id
        ? this.$http.put(
          `${process.env.VUE_APP_ROOT_API}${this.baseUrl}/${this.id}`,
          formModel,
        )
        : this.$http.post(
          `${process.env.VUE_APP_ROOT_API}${this.baseUrl}`,
          formModel,
        ).then(r => r.json());
      savePromise
        .then(
          (id) => {
            if (this.snackbar){
              this.snackbar.color = 'success';
              this.snackbar.message = 'Guardado exitosamente';
              this.snackbar.visible = true;
            }
            this.erroresValidacion = {};
            this.guardando = false;
            this.onFormSaved(id);
          },
          (error) => {
            if (this.snackbar) {
              this.snackbar.color = 'error';
            }
            if (error.status === 400) {
              error.json().then(
                (validacion) => {
                  this.erroresValidacion = validacion;
                  if (this.snackbar) {
                    this.snackbar.message = 'Existen errores de validación';
                    this.snackbar.visible = true;
                  }
                  this.guardando = false;
                }
              );
            } else if(error.status === 403) {
              if (this.snackbar) {
                this.snackbar.message = 'No tiene permisos para realizar esta acción';
                this.snackbar.visible = true;
              }
              this.guardando = false;
            } else {
              if (this.snackbar) {
                this.snackbar.message = 'Ocurrió un error al intentar guardar';
                this.snackbar.visible = true;
              }
              this.guardando = false;
            }
          }
        );
    },
    onFormSaved(resultObj) {},
    getFormModel () {
      return Object.assign({}, this.formModel);
    },
  },
}
