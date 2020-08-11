<template>
    <v-container fluid class="pb-10">
        <v-row>
            <v-col>
                <GenericForm :fields="fields"
                             v-if="!isAddLoading && !isGetLoading"
                             :error-messages="errores"
                             v-model="model" />
            </v-col>
        </v-row>
        <v-skeleton-loader
            v-if="isAddLoading || isGetLoading"
                type="card"
        ></v-skeleton-loader>
        <v-btn
            fixed
            fab
            right
            bottom
            title="Guardar"
            color="secondary"
            :loading="isAddLoading || isFormLoading"
            @click="enviar()"
        >
            <v-icon>send</v-icon>
        </v-btn>
    </v-container>
</template>

<script>
import GenericForm from '../../components/generic-fields/GenericForm';
import { fieldTypes } from '../reporte-medico/formConstants';
import FormDialog from '../../components/FormDialog';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'FormContacto',
  components: { FormDialog, GenericForm },
  props: {
    id: {
      type: Number,
      required: false
    },
  },
  data: () => ({
    model: undefined,
    fields: [
      [
        {
          fieldName: 'nombres',
          fieldType: fieldTypes.String,
          label: 'Nombres',
          isRequired: true,
        },
        {
          fieldName: 'apellidos',
          fieldType: fieldTypes.String,
          label: 'Apellidos',
          isRequired: true,
        },
      ],
      {
        fieldName: 'nroDocumento',
        fieldType: fieldTypes.String,
        label: 'Documento N°',
      },
      {
        fieldName: 'telefono',
        fieldType: fieldTypes.String,
        label: 'Teléfono',
      },
      {
        fieldName: 'domicilio',
        fieldType: fieldTypes.String,
        label: 'Domicilio',
      },
      {
        fieldName: 'fechaUltimoContacto',
        fieldType: fieldTypes.Date,
        label: 'Fecha de Último Contacto',
        meta: {
          max: new Date().toISOString(),
        },
      },
      {
        fieldName: 'tipo',
        fieldType: fieldTypes.String,
        label: 'Descripción',
      },
    ],
    formModel: {
      nombres: null,
      apellidos: null,
      nroDocumento: null,
      telefono: null,
      domicilio: null,
      fechaUltimoContacto: null,
      tipo: null,
    }
  }),
  mounted () {
    if (this.id) {
      this.$nextTick(
        () => this.getRegistro()
      );
    }
  },
  methods: {
    ...mapActions('contactos', ['agregarContacto', 'getContacto', 'editarContacto']),
    enviar () {
      if (!this.id) {
        this.agregarContacto(this.copyObject(this.model)).then(
          (r) => {
            this.$router.push({ name: 'lista-contactos' });
          },
          (err) => {
            console.error(err);
          },
        );
      } else {
        this.editarContacto({ contacto: this.copyObject(this.model), id: this.id }).then(
          () => this.$router.push({ name: 'lista-contactos' }),
          (err) => {
            console.error(err);
          },
        );
      }
    },
    copyObject (model) {
      return {
        nombres: model.nombres,
        apellidos: model.apellidos,
        nroDocumento: model.nroDocumento,
        telefono: model.telefono,
        domicilio: model.domicilio,
        fechaUltimoContacto: model.fechaUltimoContacto,
        tipo: model.tipo,
      };
    },
    getRegistro () {
      this.getContacto(Number(this.id)).then(
        res => {
          this.model = this.contacto;
        });
    },
  },
  watch: {
    contacto (val) {
      this.model = val;
    },
  },
  computed: {
    ...mapState('contactos', ['contacto', 'errores']),
    ...mapGetters('contactos', ['isAddLoading', 'isGetLoading', 'isFormLoading', ]),
  },
};
</script>

<style scoped>

</style>
