<template>
  <v-container fluid class="inicio">
    <v-row>
      <v-col>
        <h1 class="primary--text" style="opacity: .87">Covid-19 Paraguay</h1>
        <h4 class="primary--text lighten-3" style="opacity: .54">Iniciativa del Gobierno Nacional</h4>
        <v-img :src="require('../assets/cuarentena/' + diaFilename + '.png')"
               v-if="diasCuarentena !== null"
               max-height="186px" max-width="700px" contain />
      </v-col>
    </v-row>
    <v-row justify="center"
           v-if="installPrompt && !installed"
    >
      <v-col cols="12" class="text-center">
        <v-btn text
               class="accent"
               @click="instalar"
               color="white">Instalar en su dispositivo</v-btn>
      </v-col>
    </v-row>
    <v-row
           align="stretch"
           justify="start"
           :dense="$vuetify.breakpoint.smAndDown"
    >
      <template
          v-for="(item, index) in filteredMenu"
      >
          <v-col
                 xs="12"
                 sm="12"
                 md="6"
            @click="$router.push(item.url)"
            :key="'menu' + index"
        >
          <v-hover v-slot:default="{hover}">
            <v-card
                border="left"
                ripple
                shaped
                :elevation="hover ? 12 : 0"
                class="menu-item d-flex justify-center"
            >
              <v-container class="py-0">
                  <v-row align="center" class="flex-nowrap" justify="start">
                    <v-col cols="auto">
                      <div class="item-icon secondary pa-2 elevation-1">
                        <v-icon color="white">{{item.icon}}</v-icon>
                      </div>
                    </v-col>
                    <v-col
                        cols="auto"  class="menu-item-text">
                      <strong>{{item.text}}</strong>
                      <template v-if="item.subtext">
                        <br/><span v-if="item.subtext" class="text--secondary">{{item.subtext}}</span>
                      </template>
                    </v-col>
                    <v-spacer />
                    <v-col cols="auto">
                      <v-container
                          style="width: 35px; height: 35px; position: relative"
                          class="item-icon secondary pa-2 elevation-1 white--text"
                           v-if="!!item.esMensajes && cantidadMensajesNuevos > 0"
                      >
                        <v-row justify="center" align="center text-center">
                          <span>{{cantidadMensajesNuevos < 100 ? cantidadMensajesNuevos : '99+'}}</span>
                        </v-row>
                      </v-container>
                      <v-icon large v-else>keyboard_arrow_right</v-icon>
                    </v-col>
                  </v-row>
              </v-container>
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>
    <v-row>
      <v-col cols="12">
        <p class="text--secondary">
          ¿Necesita ayuda para utilizar la App? Comuníquese al <a :href="'https://wa.me/595962320456' + textoWhatsApp" target="_blank">0962320456</a> <v-img class="d-inline-block" style="top:4px;" :src="require('../assets/WhatsApp.png')" contain width="20px" height="20px"/>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {mapActions, mapGetters, mapState} from "vuex";

  export default {
    name: 'Inicio',
    data: function () {
      return {
        menu: [
          {
            text: 'Actualizar Estado de Salud',
            url: {name: 'reporte-medico'},
            loggedIn: true,
            icon: 'note_add',
          },
          {
            text: 'Actualizar Ubicación',
            url: {name: 'actualizar-ubicacion'},
            loggedIn: true,
            icon: 'location_on',
          },
          {
            text: 'Notificar Contactos',
            url: {name: 'lista-contactos'},
            loggedIn: true,
            icon: 'pan_tool'
          },
          {
            text: 'Actualizar Datos Personales',
            url: {name: 'datos-basicos'},
            loggedIn: true,
            icon: 'perm_identity'
          },
          {
            text: 'Mensajes',
            url: {name: 'lista-notificaciones'},
            loggedIn: true,
            icon: 'notifications',
            esMensajes: true,
          },
          // {
          //   text: 'QR Identificacion',
          //   url: {name: 'identificador-qr'},
          //   loggedIn: true,
          // },
        ],
        filteredMenu: [],
      }
    },
    mounted() {
      this.filterMenu();
      this.obtenerDiasCuarentena();
      if (!this.usuario) {
        this.getDatosBasicos();
      }
    },
    methods: {
      filterMenu() {
        this.filteredMenu = this.menu.filter(m => m.loggedIn === this.isLoggedIn);
      },
      ...mapActions('datosBasicos', ['obtenerDiasCuarentena', 'getDatosBasicos']),
      ...mapActions('pwa', ['setInstallPrompt', 'setInstalled']),
      instalar() {
        const self = this;
        this.installPrompt.userChoice
          .then((userChoice) => {
            console.log(userChoice);
            if (userChoice.outcome === 'accepted') {
              self.setInstallPrompt(null);
              self.setInstalled();
            }
          });
        this.installPrompt.prompt();
      },
    },
    watch: {
      isLoggedIn() {
        this.filterMenu();
      }
    },
    computed: {
      diaFilename() {
        if (this.diasCuarentena === null) return null;
        let dias = this.diasCuarentena + 1; // Ya que nos devuelve la diferencia de fechas
        dias = dias <= 14 ? dias : 14;
        return dias.toString().padStart(2, '0');
      },
      ...mapState('datosBasicos', ['diasCuarentena', 'datos']),
      ...mapGetters('notificaciones', ['cantidadMensajesNuevos']),
      ...mapGetters('auth', [
        'isLoggedIn',
      ]),
      ...mapState('auth', ['usuario']),
      ...mapState('pwa', ['installPrompt', 'installed', ]),
      textoWhatsApp() {
        let cedula = this.usuario ? this.usuario.username : (this.datos ? this.datos.numeroDocumento : null);
        let nombre = this.usuario ? `${this.usuario.nombre} ${this.usuario.apellido}` :
          (this.datos ? `${this.datos.nombre} ${this.datos.apellido}` : null);
        return cedula ?
          '?text=' + encodeURI(`Contacto a partir de la App Covid-19, Cédula de Identidad Nro.: ${cedula}, Nombre: ${nombre}`) : '';
      },
    },
  };
</script>

<style scoped>
  .menu-item {
    max-width: 100%;
    width: 100%;
    background-color: #F5F5FF;
    border-radius: 18px;
  }

  .menu-item-text {
    max-width: 50vw;
  }

  .item-icon {
    border-radius: 50%;
  }
</style>
