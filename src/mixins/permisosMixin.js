export default {
  methods: {
    tienePermiso(permiso) {
      return this.$store.getters.permisos.includes(permiso);
    }

  },
}
