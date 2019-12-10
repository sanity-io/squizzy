<template>
  <div class="navbar">
    <router-link to="/">{{ $appName }}</router-link>
    <button v-if="showLeaveButton" class="btn" @click="leaveGame">Leave game</button>
  </div>
</template>

<script>
// TODO: prettify leave button
export default {
  computed: {
    showLeaveButton() {
      const player = this.$store.state.player
      const hasMatch = this.$store.state.quiz.match
      const hasPlayer = player && player.player
      return hasMatch || hasPlayer
    }
  },
  methods: {
    leaveGame() {
      this.$store.dispatch('leaveGame')
    }
  }
}
</script>

<style lang="sass" scoped>
.navbar
  background: $color-purple
  color: $color-white
  display: flex
  justify-content: space-between
  align-items: center
  min-height: $navbar-height
  font-size: $font-size-medium
  font-weight: 700
  text-transform: uppercase
  padding: 0.5rem 1rem
  letter-spacing: 2px
</style>
