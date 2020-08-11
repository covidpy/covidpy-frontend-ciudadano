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
    cargandoRegistro: false,
    errorRegistro: false,
  }),
  mounted() {
    if (this.id) {
      this.getRegistro();
    }
  },
  watch: {
    id (val) {
      if (val) {
        this.getRegistro();
      } else {
        this.formModel = undefined;
      }
    }
  },
  methods: {
    getRegistro() {
      this.cargandoRegistro = true;
      this.errorRegistro = false;
      this.$http.get(
        `${process.env.VUE_APP_ROOT_API}${this.baseUrl}/${this.id}/dto`
      ).then(r => r.json())
        .then(entityDto => {
            this.formModel = entityDto;
            this.cargandoRegistro = false;
            this.onGetRegistroDto(entityDto);
          },
          (error) => {
            this.cargandoRegistro = false;
            this.errorRegistro = true;
            this.onGetRegistroError(error);
          });
    },
    onGetRegistroError(error) {
    },
    onGetRegistroDto(entityDto) {
    },
  },
};
