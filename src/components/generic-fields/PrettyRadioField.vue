<template>
  <v-container fluid>
    <h3 style="opacity: 0.72"
        :class="{
        'error--text': errorMessages && errorMessages.length > 0,
        'primary--text': !errorMessages || errorMessages.length === 0,
      }"
    >
      {{label + (required ? ' (Requerido)' : '')}}</h3>
    <!-- No estoy orgulloso de esto pero fue a última hora -->
    <!-- TODO (pendiente) Se podría implementar algo que parsee tipo MD Markup -->
    <!-- Entonces en el label se pone \n* tal cosa \n* tal cosa -->
    <ul v-if="name === 'dificultadRespirar'" class="primary--text" style="opacity: 0.72">
      <li>Respiración difícil</li>
      <li>Respiración incómoda</li>
      <li>Sentirse como si no estuviera recibiendo suficiente aire</li>
      <li>Cansancio al realizar su actividad habitual</li>
    </ul>
  <v-radio-group
      :value="value"
      @change="$emit('input', $event)"
      :error-messages="errorMessages"
  >
    <v-radio v-for="(item, idx) of items"
               class="pretty-radio"
                :key="idx"
               active-class="selected"
               :color="value === item[itemValue] ? 'accent' : null"
               :value="item[itemValue]"
               :label="alphabet[idx] + '. ' +  item[itemText]"
      >
      </v-radio>
  </v-radio-group>
  </v-container>
</template>

<script>
import fieldMixin from "./mixins/fieldMixin";
import selectFieldMixin from "./mixins/selectFieldMixin";

/**
 * Componente desarrollado para Look&Feel de Mitic
 */
export default {
  name: "RadioField",
  mixins: [fieldMixin, selectFieldMixin],
  data: () => ({
    // Agregar en caso de más opciones
    alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
  }),
};
</script>

<style scoped>
  .pretty-radio {
    border: solid 1px rgba(0,0,0,0.24);
    border-radius: 20px;
    padding: 16px;
  }

</style>
