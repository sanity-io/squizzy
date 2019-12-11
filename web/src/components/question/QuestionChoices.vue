<template>
  <div class="question-choices" :data-grid="choices.length">
    <choice-card
      v-for="(choice, index) in choices"
      :key="choice._key"
      :title="choice.title"
      :index="index"
      @change="selectAnswer(choice._key)"
      :class="{
        disabled: playerHasAnsweredQuestion() && selectedAnswerKey !== choice._key,
        'selected-answer': selectedAnswerKey === choice._key
      }"
      :disabled="playerHasAnsweredQuestion()"
    />
  </div>
</template>

<script>
import ChoiceCard from './ChoiceCard'
export default {
  components: {
    ChoiceCard
  },
  props: {
    choices: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedAnswer: null
    }
  },
  methods: {
    selectAnswer(key) {
      const playerId = this.$store.getters['playerStore/playerId']
      const match = this.$store.state.matchStore.match
      const didAnswerQuestion = match.answers.some(
        answer => answer.questionKey === match.currentQuestionKey && answer.player._id === playerId
      )
      this.selectedAnswerKey = key
      if (!didAnswerQuestion) {
        this.$store.dispatch('client/submitAnswer', key)
      }
    },
    playerHasAnsweredQuestion() {
      const playerId = this.$store.getters['playerStore/playerId']
      const match = this.$store.state.matchStore.match
      return match.answers.some(
        answer => answer.questionKey === match.currentQuestionKey && answer.player._id === playerId
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.question-choices
  display: grid
  grid-template-columns: 1fr 1fr
  grid-template-rows: 1fr 1fr;
  gap: 0.5rem
  padding: 0.5rem

.question-choices[data-grid="2"] .choice-card
  grid-row: 1 / -1

.question-choices[data-grid="3"] .choice-card:last-child
  grid-column: 1 / -1
</style>
