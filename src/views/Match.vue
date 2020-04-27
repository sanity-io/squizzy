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
      // Get the player object from the store
      const player = this.$store.state.playerStore.player
      // Get status of the Match
      const isOngoing = match.startedAt && !match.finishedAt

      if (!match || !isOngoing || !player) return () => import('../components/Prequiz.vue')

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
