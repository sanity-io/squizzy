<template>
  <div class="graph-wrapper">
    <div class="graph">
      <v-column
        v-for="(choice, index) in result"
        :is-correct="choice.isCorrect"
        :key="choice.title"
        :index="index"
      />
    </div>
    <div class="correct-answers">
      <div class="label">Correct answers</div>
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
export default {
  components: {
    'v-column': Column
  },
  data() {
    return {
      result: [
        {
          title: 'Welcome1',
          isCorrect: false,
          index: 0
        },
        {
          title: 'Welcome2',
          isCorrect: true,
          index: 1
        },
        {
          title: 'Welcome3',
          isCorrect: false,
          index: 2
        },
        {
          title: 'Welcome4',
          isCorrect: false,
          index: 3
        }
      ]
    }
  },
  computed: {
    correctAnswers() {
      const ICONS = ['Circle', 'Star', 'Triangle', 'Square']
      return this.result
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
  padding: 1rem
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
