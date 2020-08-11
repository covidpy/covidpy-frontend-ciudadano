<template>
  <v-container>
    <h3 style="opacity: 0.72"
        :class="{
        'error--text': errorMessages && errorMessages.length > 0,
        'primary--text': !errorMessages || errorMessages.length === 0,
      }"
    >
      {{label + (required ? ' (Requerido)' : '')}}</h3>
    <v-slider
        style="opacity: 0.72;"
        ticks
        :max="items.length - 1"
        :value="currentVal"
        :tick-labels="tickLabels"
        :error-messages="errorMessages"
        @change="$emit('input', items[$event][itemValue])"
    >
    </v-slider>
  </v-container>
</template>

<script>
import fieldMixin from "./mixins/fieldMixin";
import selectFieldMixin from "./mixins/selectFieldMixin";

export default {
  name: "StepSliderField",
  mixins: [fieldMixin, selectFieldMixin],
  props: {
    vertical: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    tickLabels() {
      return this.items.map(i => i[this.itemText]);
    },
    currentVal() {
      const idx = this.items.findIndex(i => i[this.itemValue] === this.value);
      return idx >= 0 ? idx : null;
    },
  },
};
</script>

<style scoped>
</style>
