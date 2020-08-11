<template>
    <div class="date-field">
        <v-dialog
                ref="menuFecha"
                v-model="menuFecha"
                :disabled="disabled || readonly"
                max-width="480px"
        >
            <template v-slot:activator="{ on }">
                <v-text-field
                        v-on="on"
                        v-model.trim="fechaFormateado"
                        readonly
                        outlined
                        :prepend-icon="icon"
                        :required="required"
                        :error-messages="errorMessages"
                        :label="label"
                        persistent-hint
                        autocomplete="off"
                        append-icon="event"
                        :name="name"
                />
            </template>
            <v-date-picker v-model="fecha"
                           locale="es-PY"
                           ref="fechaPicker"
                           full-width
                           :readonly="readonly"
                           :max="maxDate"
                           @input="menuFecha = false">
                <v-spacer />
                <v-btn text @click="clear()">Limpiar</v-btn>
            </v-date-picker>
        </v-dialog>
    </div>
</template>

<script>
import fieldMixin from './mixins/fieldMixin';

export default {
  name: 'DateField',
  mixins: [fieldMixin],
  props: {
    birthday: {
      type: Boolean,
      default: () => false,
    },
    max: {
      type: String,
      default: () => null,
    }
  },
  model: {
    prop: 'fecha',
    event: 'input'
  },
  data: () => ({
    menuFecha: false,
    fechaFormateado: null,
    fecha: null
  }),
  methods: {
    formatDate (date, soloMes = false) {
      if (!date) return null;

      if (soloMes) {
        const [year, month] = date.split('-');
        return `${month}/${year}`;
      }
      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
    },
    parseDate (date, soloMes = false) {
      if (!date) return null;
      if (soloMes) {
        const [month, year] = date.split('/');
        return `${year}-${month.padStart(2, '0')}`;
      }

      const [day, month, year] = date.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    },
    dateOperation () {
      const value = this.value && !isNaN(this.value) ? new Date(this.value).toISOString() : this.value;
      let fechaSplit = value ? value.split('T') : [];
      this.fecha = fechaSplit[0] || '';
    },
    clear () {
      this.fecha = null;
      this.menuFecha = false;
    },
  },
  mounted () {
    this.dateOperation();
  },
  watch: {
    menuFecha (val) {
      val && this.birthday && setTimeout(() => this.$refs.fechaPicker.activePicker = 'YEAR');
    },
    fecha () {
      this.fechaFormateado = this.formatDate(this.fecha);
      this.$emit('input', this.fecha);
    },
    value () {
      this.dateOperation();
    }
  },
  computed: {
    maxDate () {
      return this.max ? this.max : (this.birthday ? new Date().toISOString() : null);
    },
  },
};
</script>

<style scoped>
</style>
