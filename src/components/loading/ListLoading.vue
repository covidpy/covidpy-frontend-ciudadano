<template>

  <v-list>
    <template
        v-for="i in [1,2,3]"
    >
      <v-skeleton-loader
          :key="'skeleton' + i"
          type="list-item-two-line"
      />
      <v-divider
          :key="'divider' + i"
      />
    </template>
  </v-list>
</template>

<script>
  export default {
    name: "ListLoading",
    props: {
      avatar: {
        type: Boolean,
        default: false,
      },
    }
  }
</script>

<style scoped>

</style>
