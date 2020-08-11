<template>
  <v-layout row style="max-width: 40em">
    <v-text-field
        required
        :label="label"
        placeholder="Seleccione un archivo"
        readonly
        ref="fileNameInput"
        :error-messages="errorMessages"
        :value="filename"
        :name="name"
    ></v-text-field>
    <v-btn :disabled="disabled" icon v-if="!readonly" text @click="$refs.fileInput.click()"><v-icon>attach_file</v-icon></v-btn>
    <input type="file" :accept="accept" ref="fileInput" hidden @change="setValueFile()"/>
  </v-layout>
</template>

<script>
import fieldMixin from './mixins/fieldMixin';

export default {
  name: 'FileField',
  mixins: [fieldMixin],
  props: {
    accept: {
      type: String,
      required: false
    },
  },
  data: () => ({
    file: null,
    nombreArchivo: ''
  }),
  computed: {
    filename () {
      return this.file === null ? this.value : this.file.name;
    }
  },
  methods: {
    setValueFile () {
      this.file = this.$refs.fileInput.files[0];
      this.$refs.fileNameInput.$forceUpdate();
      this.$emit('input', this.file);
    }
  }

};
</script>

<style scoped>

</style>
