<template>
  <div class="quiz-page">
    <section>
      <keep-alive>
        <transition name="next" mode="out-in">
          <component :is="activeView" />
        </transition>
      </keep-alive>
    </section>
  </div>
</template>

<script>
import {mapState} from 'vuex'
const QUIZ_VIEWS = {
  question: () => import(`../components/quiz/Question.vue`),
  result: () => import(`../components/quiz/Result.vue`)
}
export default {
  computed: {
    ...mapState('quiz', ['isOngoing', 'isQuestionOpen']),
    activeView() {
      if (this.isQuestionOpen && this.isOngoing) {
        return QUIZ_VIEWS.question
      } else {
        return QUIZ_VIEWS.result
      }
    }
  }
}
</script>

<style lang="sass" scoped>

section
  display: grid
  grid-template: 'main'
  flex: 1
  position: relative
  overflow: hidden
  background: $color-white
  height: 100%

section > *
  grid-area: main // Transition: make sections overlap on same cell
  flex: 1 1 auto
  position: relative
  background: $color-white

section > :first-child
  z-index: 10 // Prevent flickering on first frame when transition classes not added yet


/* Transitions */

.next-leave-to
  animation: leaveToLeft 0.3s both cubic-bezier(0.165, 0.84, 0.44, 1)
  z-index: 0

.next-enter-to
  animation: enterFromRight 0.3s both cubic-bezier(0.165, 0.84, 0.44, 1)
  z-index: 1

@keyframes leaveToLeft
  from
    transform: translateX(0)
  to
    transform: translateX(-100%)

@keyframes enterFromRight
  from
    transform: translateX(100%)
  to
    transform: translateX(0)
</style>
