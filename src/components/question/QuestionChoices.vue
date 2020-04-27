<template>
  <div class="question-choices" :data-grid="choices.length">
    <choice-card
      v-for="(choice, index) in choices"
      :key="choice._key"
      :title="choice.title"
      :index="index"
      :class="{
        disabled: isAnswerSubmitted,
        'selected-answer': selectedChoice === choice._key || choiceIsSelected(choice._key)
      }"
      :disabled="isAnswerSubmitted"
      @change="selectAnswer(choice._key)"
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
    isAnswerSubmitted: {
      type: Boolean,
      default: false
    },
    choices: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedChoice: null
    }
  },
  methods: {
    selectAnswer(choiceKey) {
      this.selectedChoice = choiceKey
      this.$emit('answered', true)
      if (!this.isAnswerSubmitted) {
        this.$store.dispatch('client/submitAnswer', choiceKey)
      }
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
