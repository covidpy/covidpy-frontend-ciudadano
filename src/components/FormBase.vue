<template>
  <div :class="$vuetify.breakpoint.smAndDown ? 'base-form' : 'base-form pa-4'">
    <v-form @submit="$event.preventDefault(); guardarForm()">
      <v-card class="mb-5">
        <v-card-title>
          <v-btn icon @click="goBack(); $emit('goBack')" type="button" id="volver">
            <v-icon>arrow_back</v-icon></v-btn>
          <h3>{{formTitle}}</h3>
          <v-spacer></v-spacer>
          <v-btn text color="primary" :disabled="borrando || guardando || cargandoRegistro" id="eliminar_registro"
                 v-if="id && puedeEliminar" @click="mostrarConfirmacionBorrar=true">Eliminar</v-btn>
        </v-card-title>
        <v-card-text>
          <RemoteGenericForm
              ref="genericForm"
              :base-url="baseUrl"
              :id="id"
              :campos-ignorados="camposIgnoradosComputed"
              :errores-validacion="erroresValidacion"
              :disabled="guardando || borrando || cargandoRegistro"
              v-model="formModel"
              :readonly="readOnly"
              @registroLoaded="onGetRegistroDto($event)"
              @cargandoRegistroChange="cargandoRegistro = $event"
              @dtoLoaded="onDtoLoaded($event)"
              :headers="headers"
              @appendEvent="appendEvent($event)"
          >
          </RemoteGenericForm>
        </v-card-text>
      </v-card>
      <v-btn
        fixed
        dark
        fab
        bottom right
        type="submit"
        title="Guardar"
        color="secondary"
        :loading="guardando || cargandoRegistro || borrando"
        id="guardar_registro"
        v-if="puedeEditar"
      >
        <v-icon>send</v-icon>
      </v-btn>
    </v-form>
    <InfoSnackbar :snackbar="snackbar" id="snackbar"/>
    <v-snackbar
      bottom left
      v-model="descargando"
    ><v-progress-circular v-model="porcentajeDescarga" :indeterminate="totalDescarga === null"></v-progress-circular>Descargando documento</v-snackbar>
    <v-dialog maxWidth="360px" v-model="mostrarConfirmacionBorrar">
      <v-card>
        <v-card-title>
          <h2>Eliminar registro</h2>
        </v-card-title>
        <v-card-text>
          <p>
            Está seguro que desea eliminar el registro?
          </p>
        </v-card-text>
        <v-card-actions class="text-xs-right">
          <v-container class="pa-0" grid-list-xs align-content-end>
            <v-btn text @click.stop="mostrarConfirmacionBorrar = false">Cancelar</v-btn>
            <v-btn color="error" text @click.stop="borrarRegistro()" id="confirmar_borrar">Borrar</v-btn>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import snackbarMixin from '../mixins/snackbarMixin';
import InfoSnackbar from './utils/InfoSnackbar';
import permisosMixin from '../mixins/permisosMixin';
import RemoteGenericForm from './RemoteGenericForm';
import formBaseMixin from '../mixins/formBaseMixin';
import deleteRegistroMixin from "../mixins/crud-mixins/deleteRegistroMixin";
import saveRegistroMixin from "../mixins/crud-mixins/saveRegistroMixin";
import getRegistroMixin from "../mixins/crud-mixins/getRegistroMixin";

export default {
  name: 'FormBase',
  components: { RemoteGenericForm, InfoSnackbar },
  mixins: [snackbarMixin, permisosMixin, formBaseMixin, getRegistroMixin, deleteRegistroMixin, saveRegistroMixin, ],
  data: () => ({
    file: null,
    descargando: false,
    totalDescarga: null,
    progresoDescarga: null,
    cargandoRegistro: false,
  }),
  methods: {
    descargarDocumento () {
      this.descargando = true;
      this.$http.get(`${process.env.VUE_APP_ROOT_API}${this.baseUrl}/${this.id}/descargar`,
        {
          responseType: 'blob',
          progress (evt) {
            if (evt.lengthComputable) {
              this.progresoDescarga = evt.loaded;
              this.totalDescarga = evt.total;
            }
          }
        }).then(r => {
        this.$refs.fileAnchor.download = r.headers.get('content-disposition')
          .split(';')
          .find(cd => cd.includes('filename'))
          .split('=')[1]
          .split('"').join(''); // para quitar el caracter "
        return r.blob();
      }).then(
        blob => {
          const anchor = this.$refs.fileAnchor;
          anchor.href = URL.createObjectURL(blob);
          anchor.click();
          this.descargando = false;
          this.progresoDescarga = this.totalDescarga = null;
        },
        () => {
          this.descargando = false;
          this.progresoDescarga = this.totalDescarga = null;
        }
      );
    },
    onFormSaved(resultObj) {
      if (resultObj.id) {
        this.$router.replace(`./${resultObj.id}`);
      }
    },
    onBorradoExitoso() {
      this.$router.push({ name: `lista-${this.baseUrl}` }).catch(err => {});
    },
    onDtoLoaded(dto) {
      this.$emit('dtoLoaded', dto);
    },
    goBack(){
      this.$router.go(-1);
    },
    appendEvent(event) {
      this.$emit('appendEvent', event);
    }
  },
  watch: {
    id () {
      this.getRegistro();
    },
    formModel(){

    }
  },
  computed: {
    porcentajeDescarga () {
      return this.progresoDescarga !== null && this.totalDescarga !== null
        ? this.progresoDescarga / this.totalDescarga : 0;
    },
    puedeEditar () {
      return this.permisoEditar ? this.tienePermiso(this.permisoEditar) : true;
    },
    puedeEliminar () {
      return this.permisoEliminar ? this.tienePermiso(this.permisoEliminar) : true;
    },
    formTitle() {
      return (!this.id ? 'Registro de ' :
            'Modificación de ') + this.title;
    },
    readOnly() {
      return false;
    },
    headers() {
      return []
    }
  }
};
</script>

<style scoped>
  fieldset {
    border: none;
  }

  fieldset[disabled] {
    opacity: .2;
  }

</style>
