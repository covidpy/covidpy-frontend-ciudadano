export default {
  props: {
    fields: {
      type: Array,
      required: true,
    },
    ignoreFields: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Object,
      default: () => ({}),
    },
    errorMessages: {
      type: Object,
      default: () => ({}),
    },
    readonly: {
      type: Boolean,
      default: () => false,
    },
    clearable: {
      type: Boolean,
      default: () => false,
    },
    disabled: {
      type: Boolean,
      default: () => false,
    },
    headers: {
      type: Array,
      default: () => []
    },
    noGutters: {
      type: Boolean,
      default: () => false,
    },
  },
  mounted() {
    if(this.fields) this.emitDefaultValue();
  },
  watch: {
    fields: {
      immediate: true,
      deep: true,
      handler() {
        if(this.fields) this.emitDefaultValue();
      }
    },
  },
  methods: {
    emitDefaultValue() {
      let val = this.value ? Object.assign({}, this.value) : {};
      let filas = this.fields.map(f => Array.isArray(f) ? f : [f]);
      let fields = [].concat.apply([], filas);
      for (let field of fields.filter(f => !this.ignoreFields.includes(f.fieldName))) {
        if (val[field.fieldName] === undefined) {
          val[field.fieldName] = field.fieldType !== "Bool" ? null : false;
        }
      }
      this.$emit('input', val);

    },
    checkFieldConditions(f) {  // Control de condiciones genéricas
      return !f.conditions ||
        f.conditions.every(cond =>
          this.value &&
          this.value[cond.fieldName] &&
          this.value[cond.fieldName].toString() === cond.fieldValue
        );
    },
  },
}
