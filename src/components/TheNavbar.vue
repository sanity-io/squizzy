<template>
  <div class="navbar">
    <div class="app-name">{{ $appName }}</div>
    <button v-if="showLeaveButton" class="leave-button" @click="leaveMatch">
      <span class="leave-label">Leave match</span>
      <span class="leave-icon" role="img">
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M215.469 332.802l29.863 29.864L352 256 245.332 149.333l-29.863 29.865 55.469 55.469H64v42.666h205.864l-54.395 55.469zM405.334 64H106.666C83.198 64 64 83.198 64 106.666V192h42.666v-85.333h298.668v298.668H106.666V320H64v85.334C64 428.802 83.198 448 106.666 448h298.668C428.802 448 448 428.802 448 405.334V106.666C448 83.198 428.802 64 405.334 64z"
          />
        </svg>
      </span>
    </button>
  </div>
</template>

<script>
export default {
  computed: {
    showLeaveButton() {
      const hasPlayer = this.$store.state.playerStore.player
      const hasMatch = this.$store.state.matchStore.match
      return hasMatch && hasPlayer
    }
  },
  methods: {
    leaveMatch() {
      this.$store.dispatch('leaveMatch')
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
  padding: 0.5rem
  font-weight: 700
  font-size: $font-size-large
  @media screen and (max-width: 374px)
    font-size: $font-size-medium

.leave-button
  font-size: $font-size-small
  letter-spacing: 1px
  display: flex
  align-items: center

  .leave-label
    padding-right: 0.25rem

  .leave-icon svg
    display: flex
    height: 1.5em
    fill: $color-white
</style>
