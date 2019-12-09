<template>
  <div class="graph-wrapper">
    <div class="graph">
      <v-column
        v-for="(choice, index) in getAnswerDistribution"
        :choice="choice"
        :key="choice.title"
        :index="index"
        :total="getAnswerDistribution.reduce((a, b) => a.answerCount + b.answerCount)"
      />
    </div>
    <div class="correct-answers">
      <div class="label">Correct answer{{ correctAnswers.length > 1 ? 's' : '' }}</div>
      <div class="answers">
        <div
          class="answer choice"
          v-for="choice in correctAnswers"
          :key="choice.title"
          :data-choice="choice.index"
        >
          <div class="symbol"><component :is="choice.icon" /></div>
          {{ choice.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Column from './Column'
import {answerDistribution} from '../../../utils'
export default {
  components: {
    'v-column': Column
  },
  computed: {
    getAnswerDistribution() {
      return answerDistribution(this.$store.state.quiz.match)
    },
    correctAnswers() {
      const ICONS = ['Circle', 'Star', 'Triangle', 'Square']
      const choices = this.$store.getters['quiz/currentQuestion'].choices.map((choice, index) => ({
        ...choice,
        index
      }))
      return choices
        .filter(choice => choice.isCorrect)
        .map(choice => {
          return {
            ...choice,
            icon: () => import(`../symbols/${ICONS[choice.index]}Icon.vue`)
          }
        })
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../../styles/symbols.sass'
.graph-wrapper
  height: 100%
  display: flex
  flex-direction: column
  justify-content: flex-end

.graph
  display: flex
  justify-content: center
  flex: 1

.correct-answers
  padding: 0.5rem 1rem 0
  text-align: center

  .label
    text-transform: uppercase
    font-size: 0.95rem
    padding-bottom: 0.5rem

  .answers
    display: flex
    justify-content: center

  .answer
    display: flex
    padding: 0 1rem
    align-items: center

    .symbol
      display: flex

    .symbol svg
      height: 1.25em
</style>
