<template>
  <v-text-field
    :label="label + (required ? '(Requerido)' : '')"
    v-model="valor"
    :hint="hintText"
    persistent-hint
    :error-messages="errorMessages"
    outlined
    :required="required"
    @input="$emit('input', $event)"
    @blur="$emit('blur', $event)"
    :prepend-icon="icon"
    :name="name"
    :disabled="disabled"
    :readonly="readonly"
  ></v-text-field>
</template>

<script>
import fieldMixin from "./mixins/fieldMixin";

export default {
  name: "TextField",
  mixins: [fieldMixin],
  data: () => ({
    valor: null,
  }),
  mounted() {
    this.valor = this.value;
  },
  watch: {
    value(val) {
      this.valor = val;
    },
  },
}
</script>

<style scoped>

</style>
