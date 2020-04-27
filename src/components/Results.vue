<template>
  <div v-touch:swipe.left="swipeRight" v-touch:swipe.right="swipeLeft" class="result page">
    <div class="progress label">{{ status }}</div>
    <div>
      <squizzy-squid :mouth="expression.mouth" :eyes="expression.eyes" />
      <p class="feedback-heading">{{ feedbackTitle }}</p>
      <h1 class="question" :class="{long: question.title.split('').length > 60}">
        {{ question.title }}
      </h1>
      <div class="correct-answers">
        <div class="label">Correct answer{{ correctAnswers.length > 1 ? 's' : '' }}</div>
        <div class="answers">
          <div
            v-for="choice in correctAnswers"
            :key="choice.title"
            class="answer choice"
            :data-choice="choice.index"
          >
            <div class="symbol"><component :is="choice.icon" /></div>
            {{ choice.title }}
          </div>
        </div>
      </div>
    </div>
    <section class="section">
      <keep-alive>
        <component :is="activeView.component" :key="activeView.name" class="transition" />
      </keep-alive>
    </section>
    <div class="view-tracker">
      <div
        class="view-dot"
        :class="{'is-active': activeView.name === 'results'}"
        @click="swipeLeft"
      ></div>
      <div
        class="view-dot"
        :class="{'is-active': activeView.name === 'leaderboard'}"
        @click="swipeRight"
      ></div>
    </div>
  </div>
</template>

<script>
import SquizzySquid from '@/components/general/SquizzySquid'
const FEEDBACK_WRONG = [
  'So inkompetant',
  'That sucks',
  'What a squidappointment',
  'No inkling at all?',
  `Are you squddin' me!`,
  `Better luck next time...`,
  'I squid you not',
  `You don’t know squid`,
  `No tentacle points for you`
]

const FEEDBACK_CORRECT = [
  `You're squidding it`,
  'Consquidulations',
  'A squid pro quo!',
  'You are inkredible',
  `The smartest squid in the room`,
  'Inkredible effort',
  'How exsquidsit',
  `Tentacle points for you`,
  `You're kraken it`
]

const RESULT_VIEWS = {
  graph: {
    name: 'results',
    component: () => import('./result/Graph.vue')
  },
  leaderboard: {
    name: 'leaderboard',
    component: () => import('./result/Leaderboard.vue')
  }
}
import {mapGetters} from 'vuex'
export default {
  components: {
    SquizzySquid
  },
  data() {
    return {
      activeView: RESULT_VIEWS.graph,
      status: 'Waiting for Squizzmaster...'
    }
  },
  computed: {
    ...mapGetters('matchStore', ['currentQuestion', 'title', 'progress']),
    playerAnswer() {
      return this.$store.getters['playerStore/playerAnswer']
    },
    feedbackTitle() {
      const maxWrong = FEEDBACK_WRONG.length
      const maxCorrect = FEEDBACK_CORRECT.length
      // Get a random feedback sentence for wrong answers
      const randomWrong = Math.floor(Math.random() * maxWrong)
      // Get a random feedback sentence for correct answer
      const randomCorrect = Math.floor(Math.random() * maxCorrect)
      // Get the status of the player's answer from the store
      const playerAnswer = this.playerAnswer
      // Select feedback sentence based on player answer
      return playerAnswer.isCorrect
        ? `Correct! ${FEEDBACK_CORRECT[randomCorrect]}`
        : `Wrong! ${FEEDBACK_WRONG[randomWrong]}`
    },
    expression() {
      return this.playerAnswer.isCorrect
        ? {eyes: 'happy', mouth: 'happy'}
        : {eyes: 'default', mouth: 'sad-open'}
    },
    question() {
      const question = this.$store.getters['matchStore/currentQuestion']
      return question
    },
    correctAnswers() {
      const ICONS = ['Circle', 'Star', 'Triangle', 'Square']
      const choices = this.$store.getters['matchStore/currentQuestion'].choices.map(
        (choice, index) => ({
          ...choice,
          index
        })
      )
      return choices
        .filter(choice => choice.isCorrect)
        .map(choice => {
          return {
            ...choice,
            icon: () => import(`./symbols/${ICONS[choice.index]}Icon.vue`)
          }
        })
    }
  },
  methods: {
    swipeLeft() {
      if (this.activeView.name === 'leaderboard') {
        this.activeView = RESULT_VIEWS.graph
      } else {
        return
      }
    },
    swipeRight() {
      if (this.activeView.name === 'results') {
        this.activeView = RESULT_VIEWS.leaderboard
      } else {
        return
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../styles/symbols.sass'
.result
  display: grid
  grid-template-rows: min-content min-content auto min-content

.question
  margin: 0.5rem 0
  font-size: $font-size-large
  @media screen and (min-height: 667px)
    font-size: $font-size-xlarge
  @media screen and (min-height: 812px)
    font-size: $font-size-xxlarge
  @media screen and (max-width: 320px)
    font-size: $font-size-medium
  &.long
    font-size: $font-size-medium


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

.section
  display: grid
  overflow: hidden
  max-height: 100%
  min-height: 0
  grid-template-columns: 1fr
  grid-template-rows: 1fr

  .transition
    grid-column: 1
    grid-row: 1

.view-tracker
  justify-self: flex-end
  display: flex
  justify-content: center
  width: 100%
  margin: 0.5rem 0 1rem

  .view-dot
    height: 0.5rem
    width: 0.5rem
    background: $color-gray
    border-radius: 50%
    margin: 0 0.25rem
    transition: all .7s ease-in-out

    &.is-active
      transform: scale(1.1)
      background: $color-gray--darker
</style>
