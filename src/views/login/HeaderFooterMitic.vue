<template>
  <v-content class="login">
    <v-container fluid class="fill-height align-start pa-0">
      <v-row justify="center" v-if="true" align="start" no-gutters>
        <v-col cols="12">
          <v-card
              color="primary"
              shaped
              class="login-card-radius"
              elevation="0">
            <v-container>
              <v-row jutify="center" align="space-between" no-gutters>
                <v-col cols="6">
                  <v-img :src="require('../../assets/M_Salud-Publica-y-bien-estar-social.png')" height="48px" contain  />
                </v-col>
                <v-col cols="6">
                  <v-img :src="require('../../assets/GN-B-claro.png')" height="48px" contain  />
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="12" class="pt-4" style="background-color: #F5F5FF">
          <h2 class="text-center primary--text full-width">{{title}}</h2>
          <p class="text-center text--secondary px-6">Esta es una aplicación del Ministerio de Salud Pública y Bienestar Social para el seguimiento de Casos</p>
        </v-col>
        <v-col cols="12" class="text-center">
          <router-view></router-view>
        </v-col>
      </v-row>
      <v-spacer />
      <v-row justify="center" align="start" class="align-self-end" no-gutters>
        <v-col cols="12">
          <v-card
              color="primary"
              shaped
              class="footer-card"
              elevation="0">
            <v-container>
              <v-row jutify="center" align="space-between" no-gutters>
                <v-col cols="6">
                  <v-img :src="require('../../assets/QuedateEnCasa.png')" max-width="129px" height="48px" contain  />
                </v-col>
                <v-col cols="6">
                  <v-img :src="require('../../assets/paraguay-de-la-gente.png')" height="48px" contain  />
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
  export default {
    name: "HeaderFooterMitic",
    data () {
      return {
        title: 'Covid-19 Paraguay',
      }
    },
  }
</script>

<style scoped>

  .login-card-radius {
    border-radius: 0 0 4px 4px;
  }

  .footer-card {
    border-radius: 4px 4px 0 0;
  }

  .logo {
    max-width: 100px;
  }
  .full-width {
    width: 100vw;
  }
  .login-width {
    width: 360px;
  }
</style>
