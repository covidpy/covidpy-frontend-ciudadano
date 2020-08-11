<template>
  <v-container fluid>
    <v-row no-gutters justify="center">
    <v-card
        :class="{'full-width login-card-radius': $vuetify.breakpoint.xsOnly, 'login-width': $vuetify.breakpoint.smAndUp}"
        :shaped="$vuetify.breakpoint.xsOnly"
        flat
    >
      <v-card-title
          class="text-center text--primary">
        <h3 class="full-width">{{$route.meta.title}}</h3>
      </v-card-title>
      <v-card-text
          class="text-center" style="text-align: center">
        <router-view></router-view>
      </v-card-text>
    </v-card>
    </v-row>
    <InfoSnackbar :snackbar="snackbar"></InfoSnackbar>
  </v-container>
</template>

<script>
import InfoSnackbar from '../../components/utils/InfoSnackbar';
import snackbarMixin from '../../mixins/snackbarMixin';
import {mapActions, mapMutations, mapState} from 'vuex';
import {DEFAULT_ERROR_MESSAGE} from '../../constants';

export default {
  name: 'Login',
  components: { InfoSnackbar },
  mixins: [ snackbarMixin, ],
};
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
