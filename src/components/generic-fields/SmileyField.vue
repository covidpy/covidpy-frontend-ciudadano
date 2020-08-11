<template>
  <v-container>
    <h3 style="opacity: 0.72"
        :class="{
        'error--text': errorMessages && errorMessages.length > 0,
        'primary--text': !errorMessages || errorMessages.length === 0,
      }"
    >
      {{label + (required ? ' (Requerido)' : '')}}</h3>
    <v-row justify="center">
      <v-input
          :error-messages="errorMessages"
      >
      <v-col cols="auto"
             :class="{'px-2': $vuetify.breakpoint.xsOnly}"
             v-for="(item, idx) of items" :key="'smiley-col-'+idx">
        <v-icon
            :color="errorMessages && errorMessages.length > 0 ? 'error' : (item[itemValue] === value ? 'accent': null)"
            @click="$emit('input', item[itemValue])"
            x-large>{{item[itemText]}}</v-icon>
      </v-col>
      </v-input>
    </v-row>
  </v-container>
</template>

<script>
  import fieldMixin from "./mixins/fieldMixin";
  import selectFieldMixin from "./mixins/selectFieldMixin";

  export default {
    name: "SmileyField",
    mixins: [fieldMixin, selectFieldMixin],
  }
</script>

<style scoped>

</style>
