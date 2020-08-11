<template>
    <div class="sidenav-base fill-height">
        <v-navigation-drawer
                fixed
                app
                mobile-break-point="960"
                v-model="drawer"
                class="navigation-drawer"
                max-height="calc(100% - 64px)"
        >
            <v-list-item class="primary">
                <v-list-item-content>
                    <v-list-item-title class="title white--text text-center">
                        <v-img class="logo-responsive" contain height="42px"
                               :src="require('../assets/GN-B-claro.png')" /> <strong>{{title}}</strong>
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
            <v-list nav>
                <template
                    v-for="option in drawerOptionsForMenu"
                >
                    <v-list-item
                            :to="!option.disabled ? option.link : ''"
                            :key="option.title"
                            :exact="option.exact"
                    >
                      <v-badge
                          :value="!!option.esMensajes && cantidadMensajesNuevos > 0"
                          :content="cantidadMensajesNuevos < 100 ? cantidadMensajesNuevos : '99+'"
                          color="secondary"
                      >
                        <v-list-item-title :id="option.id" v-text="option.title" class="font-weight-medium"></v-list-item-title>
                      </v-badge>
                    </v-list-item>
                    <v-divider v-if="option.divider" />
                </template>
                <v-list-item
                    @click="logoutClick(isFlutterLogin)"
                >
                    <v-list-item-title
                        :id="logout"
                        class="font-weight-medium">
                        Cerrar sesión
                    </v-list-item-title>
                </v-list-item>

            </v-list>
        </v-navigation-drawer>
        <v-app-bar
            dark
            color="primary"
            class="main-toolbar white--text" app>
            <v-app-bar-nav-icon @click.stop="appNavIconClick()" class="white--text">
                <v-icon v-if="!$route.meta.goBack">menu</v-icon>
                <v-icon v-else>arrow_back</v-icon>
            </v-app-bar-nav-icon>
            <v-toolbar-title>
                <v-img :src="require('../assets/GN-B-claro.png')" height="32px" max-width="200px"  contain/>
            </v-toolbar-title>
<!--            <v-btn icon @click="mostrarAyuda = true" class="white&#45;&#45;text">-->
<!--                <v-icon medium>help</v-icon>-->
<!--            </v-btn>-->
<!--            <v-menu bottom left id="accountButton">-->
<!--                <template v-slot:activator="{ on }" >-->
<!--                    <v-btn class="white&#45;&#45;text" icon v-on="on">-->
<!--                        <v-icon medium>account_circle</v-icon>-->
<!--                    </v-btn>-->
<!--                </template>-->
<!--                <v-list id="accountMenu">-->
<!--                    <v-list-item v-if="deferredPrompt" @click="deferredPrompt.prompt">-->
<!--                        <v-list-item-title>Instalar</v-list-item-title>-->
<!--                    </v-list-item>-->
<!--                    <v-list-item v-if="isLoggedIn">-->
<!--                        <v-list-item-title id="logoutBtn" @click="logoutClick()">Cerrar sesión</v-list-item-title>-->
<!--                    </v-list-item>-->
<!--                </v-list>-->
<!--            </v-menu>-->
        </v-app-bar>
        <v-content class="fill-height">
          <v-container>
            <v-row v-if="$route.meta.title">
                <v-col>
                    <h2 class="primary--text" style="opacity: .87">
                      {{$route.meta.title}}
                </h2>
                    <v-divider/>
                </v-col>
            </v-row>
            <router-view></router-view>
          </v-container>
        </v-content>
        <ContextHelp v-model="mostrarAyuda"></ContextHelp>

    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import permisosMixin from '../mixins/permisosMixin';
    import ContextHelp from "../components/ContextHelp";

    export default {
        name: 'SidenavBase',
        components: {ContextHelp},
        mixins: [permisosMixin],
        data() {
            return {
                title: 'Covid-19 Paraguay',
                linksPermission: [],
                // Menú configuración
                drawerOptionsForConfiguration: [
                ],
                // Menu principal
                drawerOptionsForMenu: [
                    {
                        title: 'Inicio',
                        link: {name: 'home'},
                        permiso: true,
                        divider: true,
                        exact: true,
                    },
                    // {
                    //     title: 'Datos Personales',
                    //     link: {name: 'datos-basicos'},
                    //     permiso: true,
                    // },
                    {
                        title: 'Actualizar Estado de Salud',
                        link: {name: 'reporte-medico'},
                        permiso: true,
                    },
                    {
                        title: 'Actualizar Ubicación',
                        link: {name: 'actualizar-ubicacion'},
                        permiso: true,
                    },
                    {
                        title: 'Notificar Contactos',
                        link: {name: 'lista-contactos'},
                        permiso: true,
                    },
                    {
                        title: 'Actualizar Datos Personales',
                        link: {name: 'datos-basicos'},
                        permiso: true,
                    },
                    {
                        title: 'Mensajes',
                        link: {name: 'lista-notificaciones'},
                        permiso: true,
                        esMensajes:true,
                    },
                    // {
                    //     title: 'QR Identificacion',
                    //     link: {name: 'identificador-qr'},
                    //     permiso: true,
                    // },
                ],
                // Menú en perfil
                drawerOthers: [
                ],
                drawer: false,
                mostrarConfiguracion: false,
                mostrarAyuda: false,
                deferredPrompt: null,
                mensajesTimer: null,
            };
        },
        methods: {
            ...mapActions('auth', ['logout']),
            ...mapActions('notificaciones', ['obtenerNotificaciones']),
	    logoutClick(isFlutterLogin) {
		    this.logout();
		    if(isFlutterLogin) {
		        window.location = process.env.VUE_APP_FLUTTER_LOGOUT_DEEP_LINK;
		    } else {
		        this.$router.push({name: 'login'}).catch(err => {});
		    }
	    },
            cargarLinks() {
                this.linksPermission = this.drawerOptionsForConfiguration.filter(d => d.permiso).concat(this.drawerOptionsForMenu.filter(d => d.permiso)).concat(this.drawerOthers);
            },
            getMenuConPermiso() {
                let menuPermiso = this.drawerOptionsForMenu.concat(this.drawerOptionsForConfiguration).find(m => m.permiso);
                if (menuPermiso !== null) {
                    this.$router.replace(menuPermiso.link);
                }
            },
            appNavIconClick() {
                if (!this.$route.meta.goBack) {
                    this.drawer = !this.drawer;
                } else {
                    this.$router.push(this.$route.meta.goBack);
                }
            },
        },
        computed: {
            puedeConfigurar() {
                return this.drawerOptionsForConfiguration.some(c => c.permiso);
            },
            filteredConfiguracionDrawerOptions() {
                return this.drawerOptionsForConfiguration.filter(o => o.permiso);
            },
            isDark(){
                return this.$vuetify.theme.dark;
            },
            ...mapGetters('auth', [
                'isLoggedIn','isFlutterLogin'
            ]),
            ...mapGetters('notificaciones', [
                'cantidadMensajesNuevos',
            ]),

        },
        created() {
            this.cargarLinks();
            this.drawerOptionsForConfiguration.sort((a, b) => a.title > b.title ? 1 : -1);
        },
        mounted() {
            // if (this.$route.path === '/calendario') {
            //     this.getMenuConPermiso();
            // }
            document.addEventListener('beforeinstallprompt', (e) => {
                // Stash the event so it can be triggered later.
                this.deferredPrompt = e;
                this.deferredPrompt.userChoice
                    .then(() => {
                        this.deferredPrompt = null;
                    });
            });
            this.obtenerNotificaciones();
            this.mensajesTimer = setInterval(this.obtenerNotificaciones, process.env.VUE_APP_MENSAJES_REFRESH_MILI);
        },
        beforeDestroy() {
            clearInterval(this.mensajesTimer);
        },
        watch: {
            // $route(toRoute, fromRoute) {
            //     if (fromRoute.path.includes('login') || this.linksPermission.every(l => !toRoute.path.includes(l.link))) {
            //         this.getMenuConPermiso();
            //     }
            // },
        },

    };
</script>

<style scoped>

    .responsive-drawer-title {
        background: #202548;
        color: white;
    }

    .logo-responsive {
        width: auto;
        height: 48px;
    }
</style>
