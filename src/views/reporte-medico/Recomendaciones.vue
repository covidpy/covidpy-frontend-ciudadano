<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-img :src="require('../../assets/lamp.svg')"
               contain
               height="120px" />
      </v-col>
    </v-row>
    <h2 class="primary--text text-uppercase mb-10 text-center" style="opacity: .87">
      Recomendaciones
    </h2>
    <template

        v-for="(r, idx) in recomendaciones"
    >

    <v-row no-gutters
           :class="{
             'encimar': idx !== 0,
           }"
           :style="{'z-index': idx}"
           :key="'row' + idx"
    >
      <v-col cols="12">
        <blockquote
           class="primary--text pa-4 ma-0 pb-12 recomendacion-card"
           :class="{
         'impar': (idx % 2) !== 0,
         'par': (idx % 2) === 0,
       }"
          v-if="idx !== recomendaciones.length - 1">
          <ul>
          <li v-for="(line, lineIdx) in r.split(/\r?\n/)" :key="'line'+lineIdx">
            {{line}}
          </li>
          </ul>
        </blockquote>

        <v-container v-else class="primary recomendacion-card">
              <v-row no-gutters
                     align="center"
              >
                <v-col cols="2">
                  <v-img :src="require('../../assets/paraguay.svg')"
                         style="border-radius: 50%; border: 1px solid white"
                         max-height="40px"
                         max-width="40px"
                         contain/>
                </v-col>
                <v-col cols="10" class="white--text">
                  <h4>{{r}}</h4>
                </v-col>
              </v-row>
        </v-container>
      </v-col>
    </v-row>

    </template>
    <v-row justify="center">
      <v-col cols="12" class="text-center">
        <v-btn text
               class="accent"
               @click="$emit('home')"
               color="white">{{'Reportar ubicación'}}</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {mapState} from "vuex";

  export default {
    name: "Recomendaciones",
    props: {
      recomendaciones: {
        type: Array,
        required: true,
      },
    },
    computed: {
      ...mapState('reporteMedico', ['esPrimeraVez']),
    },
  }
</script>

<style scoped>
  .recomendacion-card {
    border-radius: 16px;
  }

  .recomendacion-card.par {
    background-color: #F5F5FF;
  }

  .recomendacion-card.impar {
    background-color: #DBDBF6;
  }

  .encimar {
    margin-top: -36px;
  }
</style>
