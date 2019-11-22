<template>
  <div class="match-status">
    <h3 v-if="players" class="player-number">
      {{ players }}
    </h3>
    <p class="status-message">
      {{ message }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    players: {
      type: Number,
      default: null
    },
    message: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="sass" scoped>
.match-status
  text-align: center
  margin: 2rem 0

.player-number
  font-size: 5rem
</style>
