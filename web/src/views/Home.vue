<template>
  <div class="page home">
    <squizzy-squid />
    <transition :name="transitionName" mode="out-in">
      <component :is="stage.component" :key="stage.name" />
    </transition>
  </div>
</template>

<script>
import SquizzySquid from '@/components/SquizzySquid'
import {mapState} from 'vuex'
export default {
  name: 'Home',
  components: {
    SquizzySquid
  },
  data() {
    return {
      transitionName: ''
    }
  },
  computed: {
    ...mapState('quiz', ['match']),
    ...mapState('player', ['player']),

    stage() {
      // If no match is found
      if (!this.match) {
        // show welcome screen
        return {
          name: 'welcome',
          order: 1,
          component: () => import(`../components/home/Welcome.vue`)
        }
      } else if (this.match && !this.player) {
        // register player if no player is registered already
        return {
          name: 'register',
          order: 2,
          component: () => import(`../components/home/Register.vue`)
        }
      } else {
        // Put player in pregame if there's a match
        return {
          name: 'pregame',
          order: 3,
          component: () => import(`../components/home/Pregame.vue`)
        }
      }
    }
  },
  watch: {
    stage() {
      this.transitionName = this.stage.order > this.stage.order ? 'next' : 'prev'
    }
  },
  mounted() {
    if (this.stage.order === 3) {
      this.$store.dispatch('startListener')
    }
  }
}
</script>

<style lang="sass" scoped>

.page
  display: flex
  flex-direction: column

section
  display: grid
  grid-template: 'main'
  flex: 1
  position: relative
  overflow: hidden
  background: $color-white

section > *
  grid-area: main // Transition: make sections overlap on same cell
  flex: 1 1 auto
  position: relative
  background: $color-white

section > :first-child
  z-index: 10 // Prevent flickering on first frame when transition classes not added yet


/* Transitions */

.next-leave-to
  animation: leaveToLeft 300ms both cubic-bezier(0.165, 0.84, 0.44, 1)
  z-index: 0

.next-enter-to
  animation: enterFromRight 300ms both cubic-bezier(0.165, 0.84, 0.44, 1)
  z-index: 1

.prev-leave-to
  animation: leaveToRight 300ms both cubic-bezier(0.165, 0.84, 0.44, 1)
  z-index: 1

.prev-enter-to
  animation: enterFromLeft 300ms both cubic-bezier(0.165, 0.84, 0.44, 1)
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
