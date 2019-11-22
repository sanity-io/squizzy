<template>
  <div class="page home">
    <squizzy-squid />
    <section class="section">
      <transition :name="transitionName">
        <router-view />
      </transition>
    </section>
  </div>
</template>

<script>
import SquizzySquid from '@/components/SquizzySquid'
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
  watch: {
    $route(to, from) {
      this.transitionName = to.meta.page > from.meta.page ? 'next' : 'prev'
    }
  }
}
</script>

<style lang="sass" scoped>
section
  min-height: 100%
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
  // height: 100vh // To be fixed
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
