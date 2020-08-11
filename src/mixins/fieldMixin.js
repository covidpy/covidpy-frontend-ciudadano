export default {
  props: {
    label: String,
    value: {
      required: false
    },
    required: {
      type: Boolean,
      default: () => false
    },
    errorMessages: {
      type: Array
    },
    hintText: {
      type: String
    },
    readonly: {
      type: Boolean,
      default: () => false
    },
    clearable: {
      type: Boolean,
      default: () => false
    },
    name: String,
    disabled: {
      type: Boolean,
      default: () => false
    },
  }
};
