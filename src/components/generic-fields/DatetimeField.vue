<template>
  <div class="datetime-field">
    <v-layout>
      <v-flex s12 md3>
        <v-dialog
            ref="menuFecha"
            v-model="menuFecha"
            :disabled="disabled || readonly"
            max-width="480px"
        >
            <template v-slot:activator="{ on }">
            <v-text-field
                    v-on="on"
                    outlined
                    v-model.trim="fechaFormateado"
                    :hint="`${hintText || ''}`"
                    persistent-hint
                    :label="labelFecha"
                    readonly
                    :error-messages="errorMessages"
                    autocomplete="off"
                    append-icon="event"
                    @input="fecha = $event || ''"
                    :cleareable="clearable"
                    :disabled="disabled"
                    />
          </template>
          <v-date-picker v-model="fecha" no-title
                         locale="es-PY"
                         ref="fechaPicker"
                         :readonly="readonly || disabled"
                         @input="menuFecha = false"/>
        </v-dialog>
      </v-flex>
      <v-flex s12 md3>
        <v-dialog
            ref="menuHora"
            v-model="menuHora"
            :disabled="disabled || readonly"
            max-width="480px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
                v-on="on"
                v-model="hora"
                readonly
                :label="labelHora"
                name="horaIngreso"
                outlined
                autocomplete="off"
                append-icon="access_time"
                @input="hora = $event || ''"
                :cleareable="clearable"
                :disabled="disabled"
                />
          </template>
          <v-time-picker v-model="hora"
                         locale="es-PY"
                         ref="horaPicker"
                         :readonly="readonly || disabled"
                         @change="$refs.menuHora.save(hora)" />
        </v-dialog>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import fieldMixin from "../../mixins/fieldMixin";

  export default {
    name: "DatetimeField",
    mixins: [fieldMixin],
    props: {
      value: {
        type: String,
      },
    },
    data: () => ({
      menuFecha: false,
      menuHora: false,
      fechaFormateado: null,
      fecha: null,
      hora: null,
    }),
    mounted() {
      this.dateOperation();
    },
    methods: {
      formatDate(date, soloMes = false) {
        if (!date) return null;
        if (soloMes) {
          const [year, month] = date.split('-');
          return `${month}/${year}`;
        }
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
      },
      parseDate(date, soloMes = false) {
        if (!date) return null;
        if (soloMes) {
          const [month, year] = date.split('/');
          return `${year}-${month.padStart(2, '0')}`;
        }

        const [day, month, year] = date.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      },
      dateOperation(){
        let fechaSplit = this.value ? this.value.split('T') : [];
        this.fecha = fechaSplit[0] || '';
        this.hora = fechaSplit[1] ? fechaSplit[1].substr(0, 5) : '';
      }

    },
    watch: {
      fecha() {
        this.fechaFormateado = this.formatDate(this.fecha);
        this.$emit('input', this.datetimeISO);
      },
      hora() {
        this.$emit('input', this.datetimeISO);
      },
      value() {
        this.dateOperation();
      },
    },
    computed: {
      datetimeISO() {
        return this.fecha ? `${this.fecha}T${this.hora || '00:00'}` : '';
      },
      locale() {
        return process.env.VUE_APP_LOCALE;
      },
      labelHora() {
        let label = this.label.split(":labelHora:");
        return `${label && label.length === 2 ? label[1] : label[0]}`;
      },
      labelFecha() {
        let label = this.label.split(":labelHora:");
        return `${label[0]}`;
      }
    },
  }
</script>

<style scoped>

</style>
