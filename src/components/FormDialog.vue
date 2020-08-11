<template>
  <v-dialog v-model="show" :fullscreen="!noFullscreen"
            persistent
            :max-width="maxWidth"
            :hide-overlay="!noFullscreen" :transition="transition">
    <v-btn v-slot:activator="{ on }"
           v-if="!noButton"
           :disabled="disabled"
           @click="emitirEventoAgregar()"
           text
           color="primary">{{addButtonLabel}}</v-btn>
    <v-card>
      <v-toolbar v-if="!noFullscreen" fixed dark color="primary">
        <v-btn icon title="Cancelar"
               dark @click.native="$emit('close')">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>{{toolbarTitle}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text title="Guardar" @click.native="$emit('save')">Guardar</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-title v-if="noFullscreen"><h3>{{toolbarTitle}}</h3></v-card-title>
      <v-card-text :class="{'fullscreen-card': !noFullscreen}">
        <slot name="form"></slot>
      </v-card-text>
      <v-card-actions v-if="noFullscreen">
        <v-spacer></v-spacer>
        <v-btn @click.native="$emit('close')" :disabled="disabled" text>{{ buttonCancelName }}</v-btn>
        <v-btn v-if="!readonly" @click.native="$emit('save')" color="primary" :disabled="disabled" text>{{ buttonSubmitName }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

  /**
   * FormDialog
   * Componente genérico para distintos formularios a utilizarse en
   * diálogos.
   *
   * Propiedades:
   *  * toolbarTitle: String - Título superior
   *  * addButtonLabel: String - Etiqueta el botón para mostrar el formulario
   *  * disabled: Boolean - Bandera para ocultar el botón del formulario
   *  * noButton: Boolean - Oculta el botón para abrir el dialogo. Utilizar cuando
   *  se desee controlar con un botón externo.
   *  * noFullscreen: Boolean - Desactiva el formato fullscreen del dialogo.
   *  * maxWidth: Number - Utilizado en conjunto con noFullscreen para definir el ancho
   *  del diálogo.
   *
   * Eventos:
   *  * close - Emitida al presionar "Cerrar"
   *  * save - Emitida al presionar "Guardar"
   *
   * Slots:
   *  * form - Aquí debe ir el formulario a mostrar en el cuerpo del dialog
   *
   */
  export default {
    name: "FormDialog",
    props: {
      value: {
        type: Boolean,
        default: () => false,
      },
      toolbarTitle: String,
      addButtonLabel: String,
      disabled: {
        type: Boolean,
        default: () => false,
      },
      noButton: {
        type: Boolean,
        default: () => false,
      },
      noFullscreen: {
        type: Boolean,
        default: () => false,
      },
      maxWidth: {
        type: String,
        required: false,
      },
      buttonSubmitName: {
        type: String,
        default: () => 'Guardar',
      },
      buttonCancelName: {
        type: String,
        default: () => 'Cancelar',
      },
      readonly: {
        type: Boolean,
        default: () => false,
      },
    },
    data: () => ({
      show: false,
    }),
    mounted() {
      this.show = this.value;
    },
    methods:{
      emitirEventoAgregar() {
        this.$emit('agregar-registro', true)
      }
    },
    watch: {
      value() {
        this.show = this.value;
      },
      show() {
        this.show !== this.value && this.$emit('input', this.show);
      }
    },
    computed: {
      transition() {
        return this.noFullscreen ? undefined: 'dialog-bottom-transition'
      },
    },
  }
</script>

<style scoped>
  .fullscreen-card {
    padding-top: 72px;
  }
</style>
