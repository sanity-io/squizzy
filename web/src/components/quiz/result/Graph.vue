<template>
  <div class="graph-wrapper">
    <p class="question">{{ question.title }}</p>
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
    <div class="graph">
      <v-column
        v-for="(choice, index) in getAnswerDistribution"
        :choice="choice"
        :key="choice.title"
        :index="index"
        :total="getAnswerDistribution.reduce((a, b) => a.answerCount + b.answerCount)"
      />
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
    question() {
      const question = this.$store.getters['quiz/currentQuestion']
      return question
    },
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

.question
  margin: 0.5rem 0
  font-size: $font-size-base

.correct-answers
  text-align: center
  padding-bottom: 0.5rem

  .label
    text-transform: uppercase
    font-size: $font-size-small
    padding: 0.5rem 0

  .answers
    display: flex
    justify-content: center

  .answer
    display: flex
    padding: 0 1rem
    align-items: center
    font-size: $font-size-base

    .symbol
      display: flex
      padding: 0 0.25rem

    .symbol svg
      height: $font-size-base
</style>
