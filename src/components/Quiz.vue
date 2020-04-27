<template>
  <div class="prequiz">
    <component :is="activeView" />
  </div>
</template>

<script>
import Question from './Question'
import Results from './Results'

export default {
  components: {
    Question,
    Results
  },
  computed: {
    activeView() {
      // Get the match object from the store
      const match = this.$store.state.matchStore.match
      // Show the question if the question is open, and results if not
      return match.isCurrentQuestionOpen ? 'Question' : 'Results'
    }
  }
}
</script>
