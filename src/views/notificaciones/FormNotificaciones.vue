<template>
        <v-container fluid class="pb-10">
            <div v-if="!isGetLoading">
                    <GenericForm :fields="fields"
                                 :value="notificacion"
                    />
            </div>
            <v-skeleton-loader
                    v-else
                    type="card"
            ></v-skeleton-loader>
          <v-row justify="center">

            <v-col cols="12" class="text-center">
              <v-btn text
                     class="accent"
                     :to="{name: 'lista-notificaciones'}"
                     color="white">Volver</v-btn>
            </v-col>
          </v-row>
        </v-container>
</template>

<script>
    import GenericForm from "../../components/generic-fields/GenericForm";
    import TextField from "../../components/generic-fields/TextField";
    import DateField from "../../components/generic-fields/DateField";
    import {mapActions, mapGetters, mapState} from "vuex";
    import dateFiltersMixin from '../../mixins/dateFiltersMixin'
    import {fieldTypes} from "../reporte-medico/formConstants";

    export default {
        name: "NotificacionesForm",
        components: {
            GenericForm,
            TextField,
            DateField,
        },
        props: {
            id: {
                type: String|Number,
                required: true
            },
        },
        mixins: [
            dateFiltersMixin
        ],
        data: () => ({
            model: undefined,
            fields: [
                {
                    fieldName: 'fechaNotificacion',
                    fieldType: fieldTypes.String,
                    label: 'Fecha del Mensaje',
                    readonly: true,
                },
              {
                fieldName: 'remitente',
                fieldType: fieldTypes.String,
                label: 'Remitente',
                readonly: true,
              },
              {
                fieldName: 'mensaje',
                    fieldType: 'TextArea',
                    label: 'Mensaje',
                    readonly: true,
                },
            ],
        }),
        mounted() {
            if (this.id) {
                this.$nextTick(
                    () => this.getRegistro()
                );
            }
        },
        methods: {
            ...mapActions('notificaciones', ['getNotificacion', 'marcarVisto']),
            getRegistro () {
                this.getNotificacion(Number(this.id)).then(
                    res => {
                        this.marcarVisto(this.id).then(res => {});
                        this.model = this.notificacion;
                    });
            },
        },
        computed: {
            ...mapState('notificaciones', ['notificacion']),
            ...mapGetters('notificaciones', ['isGetLoading']),
        },
    }
</script>

<style scoped>

</style>
