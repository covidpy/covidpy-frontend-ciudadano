<template>
  <v-container fluid>
  <v-radio-group
      :label="label + (required ? ' (Requerido)': '')"
      :value="value"
      @change="$emit('input', $event)"
      :error-messages="errorMessages"
      :row="horizontal"
  >
      <v-radio v-for="(item, idx) of items"
                :key="idx"
               :value="item[itemValue]"
               :label="item[itemText]"
      >
      </v-radio>
  </v-radio-group>
  </v-container>
</template>

<script>
import fieldMixin from "./mixins/fieldMixin";
import selectFieldMixin from "./mixins/selectFieldMixin";

export default {
  name: "RadioField",
  mixins: [fieldMixin, selectFieldMixin],
  props: {
    horizontal: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
</style>
