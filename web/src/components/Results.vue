<template>
  <div class="result page" v-touch:swipe.left="swipeRight" v-touch:swipe.right="swipeLeft">
    <div>
      <squizzy-squid />
      <h1 class="feedback-heading">{{ title }}</h1>
    </div>
    <section class="section">
      <transition name="swipe" mode="out-in">
        <keep-alive>
          <component :is="activeView.component" />
        </keep-alive>
      </transition>
    </section>
    <div class="view-tracker">
      <div
        class="view-dot"
        @click="swipeLeft"
        :class="{'is-active': activeView.name === 'results'}"
      ></div>
      <div
        class="view-dot"
        @click="swipeRight"
        :class="{'is-active': activeView.name === 'leaderboard'}"
      ></div>
    </div>
  </div>
</template>

<script>
import SquizzySquid from '@/components/general/SquizzySquid'
const FEEDBACK_WRONG = [
  'Inkompetant!',
  'Eek! That sucks.',
  'Oops, what a squidappointment.',
  'Really, had you no inkling at all?',
  `Are you squddin' me!`,
  `Better luck next time...`,
  'Wrong, I squid you not!'
]

const FEEDBACK_CORRECT = [
  'Wow, you did it!',
  'Congratulations!',
  'You get a squid pro quo!',
  'Well look at you go!',
  'You are inkredible!',
  `The smartest squid in the room!`,
  'Inkredible effort!',
  `Are you squiddin' me!`,
  'How exsquidsit!',
  `That's tentacle points!`,
  `Much great, many correct`
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

export default {
  components: {
    SquizzySquid
  },
  data() {
    return {
      activeView: RESULT_VIEWS.graph
    }
  },
  computed: {
    title() {
      const maxWrong = FEEDBACK_WRONG.length
      const maxCorrect = FEEDBACK_CORRECT.length
      // Get a random feedback sentence for wrong answers
      const randomWrong = Math.floor(Math.random() * maxWrong)
      // Get a random feedback sentence for correct answer
      const randomCorrect = Math.floor(Math.random() * maxCorrect)
      // Get the status of the player's answer from the store
      const playerAnswer = this.$store.getters['playerStore/playerAnswer']
      // Select feedback sentence based on player answer
      return playerAnswer.isCorrect ? FEEDBACK_CORRECT[randomCorrect] : FEEDBACK_WRONG[randomWrong]
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
.result
  display: grid
  grid-template-rows: min-content auto min-content

.feedback-heading
  font-size: $font-size-large
  @media screen and (min-height: 667px)
    font-size: $font-size-xlarge
  @media screen and (min-height: 812px)
    font-size: $font-size-xxlarge

.section
  overflow: hidden
  max-height: 100%
  min-height: 0

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

    &.is-active
      background: $color-gray--darker
</style>
