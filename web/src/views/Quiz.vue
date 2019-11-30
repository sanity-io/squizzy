<template>
  <div class="quiz-page">
    <transition name="next" mode="out-in">
      <component :is="stage.component" :key="stage.name" />
    </transition>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      transitionName: ''
    }
  },
  computed: {
    ...mapState('quiz', ['isOngoing', 'isQuestionOpen']),
    stage() {
      if (this.isQuestionOpen && this.isOngoing) {
        return {name: 'question', component: () => import(`../components/quiz/Question.vue`)}
      } else {
        return {name: 'leaderboard', component: () => import(`../components/quiz/Leaderboard.vue`)}
      }
    }
  }
}
</script>
