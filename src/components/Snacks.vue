<template>
  <div>
    <v-fade-transition>
      <v-snackbar
          v-if="snacks.length > 0"
          :key="snack.id"
          :value="snack.show"
          @input="remove(snack)"
          :timeout="snack.permanent ? 0 : 3000"
          left
          :color="snack.type"
      >
        {{snack.message}}
        <v-btn v-if="snack.action"
               color="accent"
               text
               @click="snack.action.handler(snack)">
          {{snack.action.title}}
        </v-btn>
        <v-btn v-else icon @click="snack.show = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-snackbar>
    </v-fade-transition>
  </div>
</template>

<script>
  import {mapActions, mapState} from "vuex";

  export default {
    name: "Snacks",
    data: () => ({
      timeout: 3000,
    }),
    computed: {
      ...mapState('snackbars', ['snacks']),
      snack() {
        return this.snacks[this.snacks.length - 1];
      },
    },
    methods: mapActions('snackbars', ['remove']),
  }
</script>

<style scoped>

</style>
