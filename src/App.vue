<template>
  <v-app id="inspire">
      <router-view></router-view>
      <v-snackbar v-model="updateExists">
        Existe una nueva versión de la app
        <v-btn color="accent" text @click="refreshApp">Actualizar</v-btn>
      </v-snackbar>
      <v-snackbar v-model="showInstall"
                  :timeout="5000"
      >
        Añadir app a pantalla de inicio
        <v-btn color="accent" text @click="installApp">Añadir</v-btn>
        <v-btn text @click="cancelInstall()">Cerrar</v-btn>
      </v-snackbar>
      <v-snackbar v-model="showCancelInstall" :timeout="1500">
        Puede agregar la aplicación desde el menú superior
      </v-snackbar>
    <Snacks />
  </v-app>
</template>

<script>

  import Snacks from "./components/Snacks";
  import {mapActions} from "vuex";

  export default {
    name: 'App',
    components: {Snacks},
    data: () => ({
      deferredPrompt: null,
      refreshing: false,
      registration: null,
      updateExists: false,
      showInstall: false,
      showCancelInstall: false,
    }),
    created () {
      const self = this;
      window.addEventListener('beforeinstallprompt', (e) => {
        // Stash the event so it can be triggered later.
        self.setInstallPrompt(e);
      });
      document.addEventListener(
        'swUpdated', this.showRefreshUI, { once: true }
      );
      if (navigator.serviceWorker) {
        navigator.serviceWorker.addEventListener(
          'controllerchange', () => {
            if (this.refreshing) return;
            this.refreshing = true;
            window.location.reload();
          }
        );
        }
    },
    methods: {
      showRefreshUI (e) {
        this.registration = e.detail;
        this.updateExists = true;
      },
      refreshApp () {
        this.updateExists = false;
        if (!this.registration || !this.registration.waiting) { return; }
        this.registration.waiting.postMessage('skipWaiting');
      },
      installApp() {
        this.deferredPrompt.prompt();
        this.showInstall = false;
      },
      cancelInstall() {
        this.showCancelInstall = true;
        this.showInstall = false;
        this.deferredPrompt = null;
      },
      ...mapActions('pwa', ['setInstallPrompt']),
    },
  };
</script>
