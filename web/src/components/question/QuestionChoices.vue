<template>
  <div class="question-choices" :data-grid="choices.length">
    <choice-card
      v-for="(choice, index) in choices"
      :key="choice._key"
      :title="choice.title"
      :index="index"
      @change="selectAnswer(choice._key)"
      :class="{
        disabled: playerHasAnsweredQuestion(),
        'selected-answer': choiceIsSelected(choice._key)
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
      answerSubmitted: false,
      selectedChoice: null
    }
  },
  methods: {
    selectAnswer(choiceKey) {
      const playerId = this.$store.getters['playerStore/playerId']
      const match = this.$store.state.matchStore.match
      const didAnswerQuestion = match.answers.some(
        answer => answer.questionKey === match.currentQuestionKey && answer.player._id === playerId
      )
      if (!didAnswerQuestion) {
        this.answerSubmitted = true
        this.selectedChoice = choiceKey
        this.$store.dispatch('client/submitAnswer', choiceKey)
      }
    },

    playerHasAnsweredQuestion() {
      if (this.answerSubmitted === true) {
        // shortcut for a more snappy client experience
        return true
      }
      const playerId = this.$store.getters['playerStore/playerId']
      const match = this.$store.state.matchStore.match
      const {answers = []} = match
      return answers.some(
        answer => answer.questionKey === match.currentQuestionKey && answer.player._id === playerId
      )
    },

    choiceIsSelected(choiceKey) {
      if (this.selectedChoice) {
        // shortcut for a more snappy client experience
        return this.selectedChoice === choiceKey
      }
      const playerId = this.$store.getters['playerStore/playerId']
      const match = this.$store.state.matchStore.match
      const {answers = []} = match
      const answer = answers.find(
        answer => answer.questionKey === match.currentQuestionKey && answer.player._id === playerId
      )
      return answer && answer.selectedChoiceKey === choiceKey
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
