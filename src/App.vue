<template>
  <div v-cloak id="app">
    <the-navbar />
    <router-view />
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar'
export default {
  components: {
    TheNavbar
  },
  mounted() {
    this.$store.dispatch('client/startListener')
  },
  beforeDestroy() {
    this.$store.dispatch('client/stopListener')
    this.$store.dispatch('leaveGame')
  }
}
</script>

<style lang="sass">
@import './styles/global.sass'
</style>

<style lang="sass" scoped>
main
  display: grid
  grid-template: 'main'
  flex: 1
  position: relative
  overflow: hidden
  background: $color-white

main > *
  grid-area: main // Transition: make sections overlap on same cell
  flex: 1 1 auto
  position: relative
  height: 100% // To be fixed
  background: $color-white


main > :first-child
  z-index: 10 // Prevent flickering on first frame when transition classes not added yet


/* Transitions */

.next-leave-to
  animation: leaveToLeft 600ms both cubic-bezier(0.165, 0.84, 0.44, 1)
  z-index: 0

.next-enter-to
  animation: enterFromRight 600ms both cubic-bezier(0.165, 0.84, 0.44, 1)
  z-index: 1


.prev-leave-to
  animation: leaveToRight 600ms both cubic-bezier(0.165, 0.84, 0.44, 1)
  z-index: 1

.prev-enter-to
  animation: enterFromLeft 600ms both cubic-bezier(0.165, 0.84, 0.44, 1)
  z-index: 0

@keyframes leaveToLeft
  from
    transform: translateX(0)

  to
    transform: translateX(-100%)

@keyframes enterFromLeft
  from
    transform: translateX(-100%)

  to
    transform: translateX(0)

@keyframes leaveToRight
  from
    transform: translateX(0)

  to
    transform: translateX(100%)

@keyframes enterFromRight
  from
    transform: translateX(100%)

  to
    transform: translateX(0)
</style>
