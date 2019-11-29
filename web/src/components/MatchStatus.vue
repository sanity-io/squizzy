<template>
  <div class="match-status">
    <h3 class="player-number">
      {{ players ? players : '0' }}
    </h3>
    <p class="status-message" v-if="players !== 0">
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
  align-self: center

.player-number
  font-size: 3rem
</style>
