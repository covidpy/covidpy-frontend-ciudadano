<template>
    <div class="pdf-viewer">
        <p v-if="cargandoPrevisualizacion" class="text-xs-center mt-3">
            <v-progress-circular v-model="progresoDescarga"
                                 :indeterminate="totalDescarga === null"></v-progress-circular>
            <br/>
            Cargando archivo <span v-if="totalDescarga !== null">({{progresoDescarga | prettyBytes}}/{{totalDescarga | prettyBytes}})</span>
            <br/>
            <v-btn type="button" text color="danger" @click="visualizacionRequest.abort()">
                <v-icon>close</v-icon>
                Cancelar
            </v-btn>
        </p>
        <object v-if="archivoBlobUrl" :data="archivoBlobUrl" class="mt-3" type="application/pdf" width="100%" height="650">
            <p>Su navegador no soporta la vista de PDF. Por favor, descargue el archivo para verlo.</p>
        </object>
    </div>
</template>

<script>
    export default {
        name: "PdfViewer",
        props: {
            fileUrl: {
                type: String,
                required: true,
            },
        },
        data: () => ({
            cargandoPrevisualizacion: false,
            totalDescarga: null,
            progresoDescarga: null,
            archivoBlobUrl: null,
        }),
        methods: {
            descargarArchivo() {
                this.cargandoPrevisualizacion = true;
                let self = this;
                this.archivoBlobUrl = null;
                this.$http.get(this.fileUrl,
                    {
                        responseType: 'blob',
                        downloadProgress(evt) {
                            if (evt.lengthComputable) {
                                self.progresoDescarga = evt.loaded;
                                self.totalDescarga = evt.total;
                            }
                        },
                        before(req) {
                            self.visualizacionRequest = req;
                        },
                    }).then(r =>
                    r.blob()
                ).then(
                    blob => {
                        this.archivoBlobUrl = URL.createObjectURL(blob);
                        this.cargandoPrevisualizacion = false;
                        this.visualizacionRequest = this.progresoDescarga = this.totalDescarga = null;
                    },
                    (err) => {
                        this.cargandoPrevisualizacion = false;
                        this.visualizacionRequest = this.progresoDescarga = this.totalDescarga = null;
                        if (err.statusCode === 500) {
                            this.$emit('error', err);
                        }
                    }
                )
            }
        },
        watch: {
            fileUrl(val) {
                if (val && val.startsWith('blob:')) {
                    this.archivoBlobUrl = val;
                } else if (val) {
                    this.descargarArchivo();
                } else {
                    this.archivoBlobUrl = null;
                }
            },
        },
        mounted() {
            if (this.fileUrl) {
                this.descargarArchivo();
            }
        },
    }
</script>

<style scoped>

</style>
