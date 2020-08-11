<template>
  <v-container class="mb-3">
    <v-fade-transition>
    <v-form @submit.prevent="enviar()" v-if="datos && !isGetLoading">
      <v-row>
        <v-expand-transition>
      <GenericForm
          :fields="fields"
          v-model="model"
          v-if="!isGetLoading"
          :error-messages="errores"
      />
        </v-expand-transition>
    </v-row>
    <v-btn
        fixed
        fab
        right
        bottom
        title="Guardar"
        color="secondary"
        type="submit"
        :loading="isAddLoading"
    >
      <v-icon>send</v-icon>
    </v-btn>
      </v-form>
      <v-skeleton-loader
          v-else-if="isGetLoading"
          type="card"
      />

    <v-container v-else>
      <ErrorForm message="No pudimos obtener tus datos. Revisa tu conexión a Internet e inténtalo nuevamente"
                 @retry="getDatosBasicos()" />
    </v-container>
    </v-fade-transition>
  </v-container>
</template>

<script>
  import GenericForm from "../components/generic-fields/GenericForm";
  import {fieldTypes, siNoOptions} from "./reporte-medico/formConstants";
  import {mapActions, mapGetters, mapState} from "vuex";
  import {flattenFields} from "../components/utils/utils";
  import ErrorForm from "./reporte-medico/ErrorForm";
  export default {
    name: "DatosBasicos",
    components: {ErrorForm, GenericForm},
    mounted() {
      this.$nextTick(
        () => {
          this.getDatosBasicos();
        }
      );
    },
    watch: {
      datos(datos) {
        if (datos) {
          let fields = flattenFields(this.fields);
          const model = {};
          for (let field of fields) {
            model[field.fieldName] = datos[field.fieldName];
          }
          this.model = model;
        } else {
          this.model = {};
        }
      },
    },
    methods: {
      ...mapActions('datosBasicos', ['getDatosBasicos', 'enviarDatos']),
      enviar() {
        console.log(this.model.fechaNacimiento, new Date(this.model.fechaNacimiento).getTime());
        // this.model.fechaNacimiento = new Date(this.model.fechaNacimiento).getTime();
        this.enviarDatos(this.model).then(
          () => this.$router.push({name: 'home'}),
          () => {},
        );
      },
    },
    computed: {
      ...mapGetters('datosBasicos', ['isAddLoading', 'isGetLoading']),
      ...mapState('datosBasicos', ['datos', 'errores',]),
    },
    data: () => ({
      model: undefined,
      fields: [
        {
          fieldType: fieldTypes.String,
          disabled: true,
          fieldName: 'numeroDocumento',
          label: 'Documento N°',
          icon: 'description'
        },
        {
          fieldType: fieldTypes.String,
          disabled: true,
          fieldName: 'numeroCelular',
          label: 'Número de Celular',
          icon: 'smartphone'
        },
        [
          {
            fieldType: fieldTypes.String,
            fieldName: 'nombre',
            label: 'Nombres',
            icon: 'perm_identity',
            isRequired: true,
          },
          {
            fieldType: fieldTypes.String,
            fieldName: 'apellido',
            label: 'Apellidos',
            isRequired: true,
          },
        ],
        {
          fieldType: fieldTypes.Select,
          fieldName: 'paisNacionalidad',
          label: 'País de Nacimiento',
          optionsSource: '/apicovid/rest/covid19/paises',
          optionsTextProp: 'value',
          optionsIdProp: 'value',
          meta: {
            icon: 'map',
          },
        },
        {
          fieldType: fieldTypes.String,
          fieldName: 'ciudadNacimiento',
          label: 'Ciudad de Nacimiento',
          icon: 'place',
        },
        {
          fieldType: fieldTypes.Date,
          fieldName: "fechaNacimiento",
          label: "Fecha de Nacimiento",
          meta: {
            birthday: true,
            icon: 'cake',
          },
        },
        {
          fieldType: fieldTypes.Radio,
          fieldName: "residenteParaguay",
          label: "Es residente en Paraguay",
          optionsSource: siNoOptions,
        },
        {
          fieldType: fieldTypes.String,
          fieldName: "direccionDomicilio",
          label: "Dirección",
          icon: 'map',
        },
        {
          fieldType: fieldTypes.String,
          fieldName: "departamentoDomicilio",
          label: "Departamento de Domicilio",
          optionsSource: "/identidad/rest/departamento/obtenerDepartamento",
          icon: 'place',
        },
        {
          fieldType: fieldTypes.String,
          fieldName: "ciudadDomicilio",
          label: "Ciudad de Domicilio",
          icon: 'place',
          optionsSource: "/identidad/rest/departamento/obtenerDepartamento",
        },
      ],
    }),
  }
</script>

<style scoped>

</style>
