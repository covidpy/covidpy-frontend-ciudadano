/* eslint-disable no-unused-vars */
import Vue from 'vue';
import Router from 'vue-router';
import SidenavBase from "./views/SidenavBase";
import store from './store/store';

const ListaContactos = () => import("./views/registro-contactos/ListaContactos");
const FormContacto = () => import("./views/registro-contactos/FormContacto");
// const IdentificadorQR = () => import("./views/IdentificadorQR");
const Login = () => import("./views/login/Login");
const LoginForm = () => import("./views/login/LoginForm");
const OlvideClave = () => import("./views/login/OlvideClave");
const Inicio = () => import("./views/Inicio");
const DatosBasicos = () => import("./views/DatosBasicos");
const ActualizarUbicacion = () => import("./views/ActualizarUbicacion");
const CambiarClave = () => import("./views/login/CambiarClave");
const ReporteMedico = () => import("./views/reporte-medico/ReporteMedico");
const ListaNotificaciones = () => import("./views/notificaciones/ListaNotificaciones");
const FormNotificaciones = () => import("./views/notificaciones/FormNotificaciones");
const TerminosCondiciones = () => import("./views/login/TerminosCondiciones");
const HeaderFooterMitic = () => import("./views/login/HeaderFooterMitic");
// const DatosClinicos = () => import("./views/reporte-medico/DatosClinicos");

Vue.use(Router, {
  enableTracing: true
});

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: SidenavBase,
      children: [
        {
          path: 'datos-basicos',
          name: 'datos-basicos',
          component: DatosBasicos,
          meta: {
            title: 'Actualizar Datos Personales',
            goBack: {name: 'home'},
          }
        },
        // {
        //   path: 'reporte-medico',
        //   name: 'reporte-medico',
        //   component: DatosClinicos,
        //   meta: {title: 'Actualizar Estado de Salud'}
        // },
        {
          path: 'actualizar-ubicacion',
          name: 'actualizar-ubicacion',
          component: ActualizarUbicacion,
          meta: {
            title: 'Notificar Ubicación',
            goBack: {name: 'home'},
          },
        },
        {
          path: 'reporte-medico',
          name: 'reporte-medico',
          component: ReporteMedico,
          meta: {
            goBack: {name: 'home'},
          },
        },
        // {
        //   path: 'identificador-qr',
        //   name: 'identificador-qr',
        //   component: IdentificadorQR,
        // },
        {
          path: 'contactos',
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'nuevo',
              name: 'nuevo-contacto',
              component: FormContacto,
              meta: {
                title: 'Notificar Contacto Físico con Personas',
                goBack: {name: 'lista-contactos'},
              }
            },
            {
              path: '',
              name: 'lista-contactos',
              component: ListaContactos,
              meta: {
                title: 'Personas con la que tuvo contacto desde el inicio de los síntomas',
                goBack: {name: 'home'},
              },
            },
            {
              path: ':id',
              component: {
                render(c) {
                  return c('router-view')
                }
              },
              children: [
                {
                  path: '',
                  component: FormContacto,
                  props: (route) => ({
                    id: route.params.id,
                  }),
                  name: `editar-contacto`,
                  meta: {
                    title: 'Editar Contacto',
                    goBack: {name: 'lista-contactos'},
                  },
                }
              ]
            }
          ],
        },
        {
          path: 'notificaciones',
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children : [
            {
              path: '',
              name: 'lista-notificaciones',
              component: ListaNotificaciones,
              meta: {
                title: 'Mensajes',
                goBack: {name: 'home'},
              },
            },
            {
              path: ':id',
              component: {
                render(c) {
                  return c('router-view')
                }
              },
              children: [
                {
                  path: '',
                  component: FormNotificaciones,
                  props: (route) => ({
                    id: route.params.id,
                  }),
                  name: `detalle-notificaciones`,
                  meta: {
                    title: 'Mensaje',
                    goBack: {name: 'lista-notificaciones'},
                  },
                }
                ]
            }
          ]
        },
        {
          path: '',
          name: 'home',
          component: Inicio,
        },
      ],
    },
    {
      path: '/terminos',
      component: HeaderFooterMitic,
      children: [
        {
          path: '',
          name: 'terminos-condiciones',
          component: TerminosCondiciones,
          meta: {
            title: 'Términos y condiciones',
            noAuth: true,
          },
        },
      ],
    },
    {
      path: '/login',
      component: HeaderFooterMitic,
      children: [
        {
          path: '',
          component: Login,
          children: [
            {
              path: 'recuperar-clave',
              name: 'recuperar-clave',
              component: OlvideClave,
              meta: {
                noAuth: true,
                title: 'Olvidé mi contraseña',
              },
            },
            {
              path: 'cambiar-clave',
              name: 'cambiar-clave',
              component: CambiarClave,
              meta: {
                title: 'Cambiar contraseña',
              },
            },
            {
              path: '',
              name: 'login',
              component: LoginForm,
              meta: {
                noAuth: true,
                title: 'Iniciar sesión',
              },
            },
          ],
        },
      ],
    },
  ],
  base: process.env.VUE_APP_BASE_HREF,
});

/**
 * to: el objeto de ruta objetivo al que se está navegando.
 * from: la ruta actual desde la que se navega.
 * next: esta función debe invocarse para resolver la navegacion.
 *
 * https://router.vuejs.org/guide/advanced/navigation-guards.html#global-guards
 */
router.beforeEach((to, from, next) => {
  if (to.query['authToken']) {
    store.dispatch('auth/setToken', to.query['authToken']);
    to.query['authToken'] = undefined;
    next(to);
  }
  if (to.query['flutter']) {
    store.dispatch('auth/isFlutter' );
  }
  if (!to.meta.noAuth) {
    // Una ruta autenticada
    const authToken = store.state.auth.token;
    if (!authToken) {
      // No está autenticado, va al login
      next({path: '/login', query: {'redirect': to.path}});
    } else if (store.state.auth.cambiarPass && to.name !== 'cambiar-clave') {
      // Está autenticado y no es cambiar-clave, pero tiene que cambiar su password
      next({name: 'cambiar-clave'});
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
