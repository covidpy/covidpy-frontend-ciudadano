<template>
  <v-text-field
    :label="label"
    :append-icon="hidePass ? 'visibility' : 'visibility_off'"
    @click:append="hidePass = !hidePass"
    :type="hidePass ? 'password' : 'text'"
    v-model="valor"
    :hint="hintText"
    :error-messages="errorMessages"
    outlined
    :required="required"
    @input="$emit('input', $event)"
    @blur="$emit('blur', $event)"
    :name="name"
    :disabled="disabled"
    :readonly="readonly"
  ></v-text-field>
</template>

<script>
import fieldMixin from "./mixins/fieldMixin";

export default {
  name: "PasswordField",
  mixins: [fieldMixin],
  data: () => ({
    hidePass: true,
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
