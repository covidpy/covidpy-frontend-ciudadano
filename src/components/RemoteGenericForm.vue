<template>
  <div class="remote-generic-form">
    <div v-if="dtoFormat && !errorRegistro && !cargandoDto && !cargandoRegistro" style="width: 100%">
      <GenericForm :fields="dtoFormat"
                   :error-messages="erroresValidacion"
                   :ignore-fields="camposIgnorados"
                   v-model="formModel"
                   :disabled="disabled"
                   :readonly="readonly"
                   :headers="headers"
                   @appendEvent="appendEvent($event)"
      ></GenericForm>

    </div>
    <ErrorMessage
        v-else-if="errorDto"
        @refresh="getDtoFormat()"
        message="Error al obtener el formulario. Revise su conexión e inténtelo nuevamente"></ErrorMessage>
    <ErrorMessage
        v-else-if="errorRegistro"
        @refresh="getRegistro()"
        message="Error al obtener los datos. Revise su conexión e inténtelo nuevamente"></ErrorMessage>
    <v-skeleton-loader
            ref="skeleton"
            v-if="cargandoDto || cargandoRegistro"
            type="card"
            class="mx-auto"
    ></v-skeleton-loader>
  </div>
</template>

<script>
import ErrorMessage from './utils/ErrorMessage';
import GenericForm from './generic-fields/GenericForm';
import getRegistroMixin from "../mixins/crud-mixins/getRegistroMixin";

export default {
  name: 'RemoteGenericForm',
  components: { GenericForm, ErrorMessage },
  mixins: [getRegistroMixin, ],
  props: {
    erroresValidacion: {
      type: Object,
      default: () => ({}),
    },
    camposIgnorados: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    value: {
      type: Object,
      default: () => undefined,
    },
    readonly: {
      type: Boolean,
      default: () => false,
    },
    headers: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    dtoFormat: null,
    cargandoDto: false,
    errorDto: false,
  }),
  mounted () {
    this.getDtoFormat();
    if (this.id) {
      this.getRegistro();
    }
  },
  methods: {
    getDtoFormat () {
      this.cargandoDto = true;
      this.errorDto = false;
      this.$http.get(`${process.env.VUE_APP_ROOT_API}${this.baseUrl}/dto`)
        .then(r => r.json())
        .then(
          dto => {
            this.cargandoDto = false;
            this.dtoFormat = dto;
            this.$emit('dtoLoaded', dto);
          },
          () => {
            this.cargandoDto = false;
            this.errorDto = true;
          }
        );
    },
    appendEvent(event) {
      this.$emit('appendEvent', event);
    },
    onGetRegistroDto(entityDto) {
      this.$emit('registroLoaded', entityDto);
    },
  },
  watch: {
    formModel: {
      deep: true,
      handler (value) {
        this.$emit('input', value);
      },
    },
    value (val) {
      this.formModel = val;
    },
    cargandoRegistro (val) {
      this.$emit('cargandoRegistroChange', val);
    },
  },
};
</script>

<style scoped>

</style>
