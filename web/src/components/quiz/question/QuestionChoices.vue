<template>
  <div class="question-choices" :data-grid="choices.length">
    <choice-card
      v-for="(choice, index) in choices"
      :key="choice._key"
      :title="choice.title"
      :index="index"
      @change="selectAnswer(choice._key)"
      :class="{
        disabled: selectedAnswer && selectedAnswer !== choice._key,
        'selected-answer': selectedAnswer === choice._key
      }"
      :disabled="selectedAnswer && selectedAnswer !== choice._key"
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
      this.selectedAnswer = key
      this.$store.dispatch('client/submitAnswer', key)
    }
  }
}
</script>

<style lang="sass" scoped>
.question-choices
  display: grid
  grid-template-columns: 1fr 1fr
  gap: 0.5rem
  padding: 0.5rem

.question-choices[data-grid="3"] .choice-card:last-child
  grid-column: 1 / -1
</style>
