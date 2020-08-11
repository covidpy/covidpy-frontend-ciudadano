<template>
  <div>
  <v-container fluid v-if="!dioPermiso && !mostrarSolicitudUbicacion">
    <v-row>
      <v-col cols="12" class="pa-0">
        <v-flex >
          <p class="primary--text" style="opacity: .84;">
            No hemos podido detectar tu ubicación,
            por favor arrastre el marcador en el mapa a la ubicación en que se encuentra.
            Es muy importante para combatir el virus
          </p>
          <div class="map-container">
            <l-map
                ref="map"
                :zoom.sync="zoom"
                :center.sync="center"
                style="z-index: 0;"
            >
             <l-tile-layer :url="url"
                           :attribution="attribution"
             />
              <l-marker draggable :lat-lng.sync="markerPosition"/>
            </l-map>
          </div>
        </v-flex>
      </v-col>
    </v-row>
  </v-container>
    <v-container v-else>
      <v-row class="text-center"
             style="opacity: 0.72;"
             no no-gutters>
        <v-col cols="12">
          <v-icon size="120px" color="primary">map</v-icon>
        </v-col>
        <v-col cols="12">
          <v-progress-linear color="primary" indeterminate active rounded />
        </v-col>
        <v-col cols="12">
          <h1 class="primary--text">Estamos obteniendo tu ubicación</h1>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog
        v-model="mostrarConfirmarEnvio"
        max-width="290"
    >
      <v-card>
        <v-card-title>Confirmar ubicación</v-card-title>
        <v-card-text>¿Desea enviar su ubicación?</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="mostrarConfirmarEnvio = false">Cancelar</v-btn>
          <v-btn color="accent" text @click="enviarClick()">Enviar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
        v-model="mostrarSolicitudUbicacion"
        max-width="290"
    >
      <v-card>
        <v-card-title>Acceder a Ubicación</v-card-title>
        <v-card-text>Necesitamos acceder a la ubicación de tu dispositivo</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="accent" text @click="aceptoUbicacion()">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <InfoSnackbar :snackbar="snackbar"/>
    <v-btn
        dark
        fab
        fixed
        bottom
        v-if="!dioPermiso"
        right
        title="Guardar"
        color="secondary"
        @click.stop="solicitarConfirmacionEnvio()"
        :loading="loading"
    >
      <v-icon>send</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { LMap, LMarker, LTileLayer } from 'vue2-leaflet';
import { latLng } from 'leaflet';
import snackbarMixin from '../mixins/snackbarMixin';
import InfoSnackbar from '../components/utils/InfoSnackbar';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ActualizarUbicacion',
  components: {
    InfoSnackbar,
    LMap,
    LTileLayer,
    LMarker,
  },
  mixins: [snackbarMixin],
  mounted () {
    this.checkPermiso().then(
      () => {
        this.dioPermiso ? this.getLocation() : this.mostrarSolicitudUbicacion = true;
      }, () => {
        this.mostrarSolicitudUbicacion = true;
      }
    );
  },
  methods: {
    aceptoUbicacion () {
      this.mostrarSolicitudUbicacion = false;
      this.setDioPermiso(true);
      this.getLocation();
    },
    getLocation () {
      this.dioPermiso
        ? this.solicitarUbicacion().then(() => {
          this.markerPosition = { lng: this.ubicacionDispositivo.lng, lat: this.ubicacionDispositivo.lat };
          this.enviarClick();
        }, () => {
          this.setDioPermiso(false);
        }) : this.mostrarSolicitudUbicacion = true;
    },
    solicitarConfirmacionEnvio () {
      this.mostrarConfirmarEnvio = true;
    },
    enviarClick () {
      const ubicacion = {
        longReportado: this.markerPosition.lng,
        latReportado: this.markerPosition.lat,
        longDispositivo: this.ubicacionDispositivo ? this.ubicacionDispositivo.lng : null,
        latDispositivo: this.ubicacionDispositivo ? this.ubicacionDispositivo.lat : null,
      };
      this.mostrarConfirmarEnvio = false;
      this.enviarUbicacion(ubicacion).then(() => {
        this.$router.push({ name: 'home' });
      }, () => {
        if (this.dioPermiso) {
          this.$router.push({ name: 'home' });
        }
      });
    },
    ...mapActions(
      'ubicaciones',
      ['enviarUbicacion', 'solicitarUbicacion', 'checkPermiso', 'setDioPermiso', 'obtenerUltimaUbicacion']
    ),
  },
  watch: {
    dioPermiso(val) {
      if (!val) {
        this.obtenerUltimaUbicacion();
      }
    },
    ultimaUbicacion(val) {
      if (val) {
        this.markerPosition = {
          lng: val.longReportado,
          lat: val.latReportado,
        };
        if (this.$refs.map) {
          this.$refs.map.mapObject.flyTo(latLng(this.markerPosition.lat, this.markerPosition.lng), 14);
        } else {
          this.$nextTick(() => {
            this.$refs.map.mapObject.flyTo(latLng(this.markerPosition.lat, this.markerPosition.lng), 14);
          });
        }
      }
    },
  },
  computed: {
    ...mapState('ubicaciones', ['loading', 'dioPermiso', 'ubicacionDispositivo', 'errorUbicacion', 'ultimaUbicacion']),
  },
  data: () => ({
    url: 'https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png',
    attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    zoom: 6,
    center: latLng(-23.4380203, -58.4483065),
    markerPosition: {
      lng: -58.4483065, lat: -23.4380203
    },
    mostrarConfirmarEnvio: false,
    mostrarSolicitudUbicacion: false,
  }),
};
</script>

<style scoped>
  .fab-up {
    right: 32px;
  }

  .map-container {
    height: 63vh;
  }
</style>
