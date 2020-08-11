<template>
  <v-dialog :value="value"
            width="80vw"
            height="90vh"
            @input="closeDialog()"
  >
    <v-card>
      <v-card-title primary-title><h1>Ayuda</h1></v-card-title>
      <v-card-text style="height: calc(100vh - 236px); overflow-y: auto;">
        <v-layout justify-center>
          <v-progress-circular indeterminate v-if="loading && !error"></v-progress-circular>
        </v-layout>
        <div v-html="helpHtml" v-if="!loading && !error && !editando"></div>
        <HtmlInput v-if="editando" v-model="formModel.contenidoAyuda"></HtmlInput>
        <ErrorMessage v-if="error" @refresh="getHelp()" :message="errorMessage"/>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="puedeEditar && !editando" text @click="editando = true">Editar</v-btn>
        <v-btn
            color="primary"
            text
            @click="$emit('input', false)"
            v-if="!editando"
        >
          Cerrar
        </v-btn>
        <v-btn text :disabled="guardando" v-if="editando" @click="cancelEdit()">Cancelar</v-btn>
        <v-btn text :disabled="guardando" color="primary" v-if="editando" @click="guardarForm()">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ErrorMessage from "./utils/ErrorMessage";
import permisosMixin from "../mixins/permisosMixin";
import HtmlInput from "./HtmlInput";
import saveRegistroMixin from "../mixins/crud-mixins/saveRegistroMixin";

export default {
  name: 'ContextHelp',
  components: {HtmlInput, ErrorMessage},
  props: {
    value: {
      type: Boolean,
    },
    baseUrl: {
      default: () => 'ayuda',
    },
  },
  mixins: [permisosMixin, saveRegistroMixin, ],
  mounted () {
    if (this.value) {
      this.getHelp();
    }
  },
  data: () => ({
    loading: false,
    error: false,
    helpHtml: null,
    errorMessage: 'No se pudo obtener el contenido',
    editando: false,
    formModel: {
      contenidoAyuda: null,
      path: null,
    },
  }),
  watch: {
    value(val) {
      if (val) {
        this.getHelp();
      }
    },
  },
  methods: {
    getFormModel() {
      const model = Object.assign({}, this.formModel);
      model['path'] = encodeURIComponent(this.routeId);
      return model;
    },
    async getHelp () {
      this.loading = true;
      this.error = false;
      try {
        const r = await this.$http.get(`${process.env.VUE_APP_ROOT_API}ayuda/`, {
          params: {
            filter: [`path:${encodeURIComponent(this.routeId)}:eq`]
          },
        });
        const list = await r.json();
        this.formModel.contenidoAyuda = this.helpHtml = list.length > 0 ? list[0].contenidoAyuda: '<p>Sin ayuda para este componente.</p>';
        this.id = list[0] ? list[0].id : null;
      } catch (error) {
        this.error = true;
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    closeDialog() {
      this.editando = false;
      this.$emit('input', false);
    },
    onFormSaved(obj) {
      if (obj && obj.id) {
        this.id = obj.id;
      }
      this.helpHtml = this.formModel.contenidoAyuda;
      this.editando = false;
    },
    cancelEdit() {
      this.formModel.contenidoAyuda = this.helpHtml;
      this.editando = false;
    },
  },
  computed: {
    routeId () {
      return this.$route.matched[this.$route.matched.length - 1].path;
    },
    puedeEditar() {
      return false;
    },
  },
};
</script>

<style scoped>
</style>
