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
    permisoEditar: {
      type: String,
      required: false
    },
    permisoEliminar: {
      type: String,
      required: false
    },
    title: {
      type: String,
      required: false
    },
    camposIgnorados: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    camposIgnoradosComputed() {
      return this.camposIgnorados;
    },
  },
}