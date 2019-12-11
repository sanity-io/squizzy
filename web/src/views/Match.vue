<template>
  <div class="view match">
    <component :is="activeView" />
  </div>
</template>

<script>
export default {
  computed: {
    activeView() {
      // Get the match object from the store
      const match = this.$store.state.matchStore.match

      if (!match) return () => import('../components/Prequiz.vue')

      // Get status of the Match
      const isOngoing = match.startedAt && !match.finishedAt

      if (!isOngoing) return () => import('../components/Prequiz.vue')

      return () => import('../components/Quiz.vue')
    }
  }
}
</script>

<style lang="sass" scoped>
.match
  display: grid
  grid-template-rows: auto
</style>
