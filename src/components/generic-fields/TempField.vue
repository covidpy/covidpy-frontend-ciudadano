<template>

  <v-container>
    <h3 style="opacity: 0.72"
        :class="{
        'error--text': errorMessages && errorMessages.length > 0,
        'primary--text': !errorMessages || errorMessages.length === 0,
      }"
        class="mb-10"
    >
      {{label + (required ? ' (Requerido)' : '')}}</h3>
    <v-slider
        :min="minTemp"
        :max="maxTemp"
        :step="stepTemp"
        color="primary"
        :value="value"
        :error-messages="errorMessages"
        @change="$emit('input', $event)"
        thumb-label="always">
      <template v-slot:prepend>
        <v-icon :disabled="!value || value === minTemp" color="primary" @click="disminuirTemp">remove</v-icon>
      </template>
      <template v-slot:append>
        <v-icon :disabled="value === maxTemp" color="primary" @click="aumentarTemp">add</v-icon>
      </template>
    </v-slider>
  </v-container>
</template>

<script>
  import fieldMixin from "./mixins/fieldMixin";

  export default {
    name: "TempField",
    mixins: [fieldMixin],
    props: {

      minTemp: {
        type: Number,
        default: () => 35,
      },
      maxTemp: {
        type: Number,
        default: () => 42,
      },
      stepTemp: {
        type: Number,
        default: () => 0.1,
      },
    },
    methods: {
      disminuirTemp() {
        this.$emit('input', this.value - this.stepTemp);
      },
      aumentarTemp() {
        this.$emit('input', (this.value ? this.value : this.minTemp) + this.stepTemp);
      },
    },
  }
</script>

<style scoped>

</style>
