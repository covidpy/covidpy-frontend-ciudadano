<template>

  <v-form
      class="d-flex flex-column justify-center align-center"
      @submit.prevent="loginClick()"
  >
    <fieldset style="width: 400px; max-width: 100%"
              :disabled="loading">
      <v-text-field prepend-icon="person"
                    name="username"
                    outlined
                    label="Cédula (Nro. de documento)"
                    autocomplete="username"
                    placeholder="Ej. 1234567"
                    :rules="[rules.userRequired]"
                    v-model="authData.username"
      ></v-text-field>
      <v-text-field prepend-icon="lock"
                    name="password"
                    outlined
                    autocomplete="password"
                    placeholder="*********"
                    label="Contraseña"
                    v-model="authData.password"
                    :append-icon="ocultarPass ? 'visibility' : 'visibility_off'"
                    @click:append="ocultarPass = !ocultarPass"
                    :type="ocultarPass ? 'password' : 'text'"
                    :rules="[rules.required]"
                    counter
      ></v-text-field>
      <v-flex class="pb-3">
        <v-btn text color="white" class="ma-0 accent" style="width: 100%" :loading="loading" type="submit"
        >Ingresar
        </v-btn>
      </v-flex>
      <v-flex>
        <v-container fluid class="pa-0">
          <v-row>
            <v-col cols="auto">

            <span>
            <router-link
                :to="{name: 'terminos-condiciones'}"
                class="ma-0 primary--text" style="opacity: .71" :disabled="loading" type="button"
            ><strong>Términos y Condiciones</strong>
            </router-link>
              </span>
            </v-col>
            <v-divider/>
            <v-col cols="auto">

        <span>
        <router-link
            :to="{name: 'recuperar-clave'}"
            class="ma-0 primary--text" style="opacity: .71" :disabled="loading" type="button"
        ><strong>Olvidé mi contraseña</strong>
        </router-link>
          </span>
            </v-col>
          </v-row>
        </v-container>
        <v-divider/>
      </v-flex>
    </fieldset>
  </v-form>
</template>

<script>
  import {DEFAULT_ERROR_MESSAGE} from "../../constants";
  import {mapActions, mapState} from "vuex";

  export default {
    name: "LoginForm",
    data: () => ({
      authData: {
        username: '',
        password: '',
      },
      ocultarPass: true,
      rules: {
        required: value => !!value || 'La clave es requerida.',
        userRequired: value => !!value || 'Debe ingresar su cédula.',
      },
    }),
    mounted(){
      this.loginAuth()
    },
    methods: {
      loginClick () {
        this.login(this.authData).then(
          () => {
            this.$nextTick(
              () => this.$router.push(this.getRedirectRoute()).catch(() => {})
            );
          },
          () => {
          }
        );
      },
      ...mapActions('auth', ['login', 'loginConToken', 'logout']),
      loginAuth() {
        if (this.$route.query.token) {
          this.logout();
          this.loginConToken(this.$route.query.token).then(
            () => {
              this.$nextTick(
                () => this.$router.push(this.getRedirectRoute()).catch(() => {})
              );
            },
            err => {
              if (err.status === 401) {
                this.snackbar.message = 'No se pudo iniciar sesión, intente con su cédula y contraseña';
              } else {
                this.snackbar.message = DEFAULT_ERROR_MESSAGE;
              }
              this.snackbar.color = 'error';
              this.snackbar.visible = true;
            });
        } else if (this.token) {
          this.$router.push(
            !this.cambiarPass ?
            this.getRedirectRoute() : {name: 'cambiar-clave'}
          ).catch(err => {});
        }
      },
      getRedirectRoute() {
        return this.$route.query && this.$route.query.redirect ? this.$route.query.redirect : '/';
      },
    },
    computed: {
      ...mapState('auth', ['loading', 'token', 'cambiarPass']),
    },
  }
</script>

<style scoped>
  fieldset {
    border: none;
  }

</style>
