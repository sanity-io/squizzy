<template>
  <div class="result-page" v-touch:swipe.left="swipeRight" v-touch:swipe.right="swipeLeft">
    <div>
      <squizzy-squid />
      <h1 class="result-heading">{{ title }}</h1>
      <h2 class="view-heading">{{ activeView.name }}</h2>
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
  'Really, no inkling at all?',
  `Are you squddin' me!`,
  `An inkling tells me that's wrong`,
  'Wrong. I squid you not!'
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

const FEEDBACK_CORRECT = [
  'You did it!',
  'Congratulations!',
  'You get a squid pro quo!',
  'Well look at you go!',
  'You are inkredible!',
  `The smartest squid in the room!`,
  'Inkredible effort!',
  `Are you squiddin' me!`,
  'How exsquidsit!',
  `That's tentacle points!`
]
export default {
  components: {
    SquizzySquid
  },
  data() {
    return {
      activeView: null
    }
  },
  computed: {
    title() {
      const maxWrong = FEEDBACK_WRONG.length
      const maxCorrect = FEEDBACK_CORRECT.length
      const randomWrong = Math.floor(Math.random() * maxWrong)
      const randomCorrect = Math.floor(Math.random() * maxCorrect)
      const randomResult = Math.ceil(Math.random() * 2)
      return randomResult === 1 ? FEEDBACK_WRONG[randomWrong] : FEEDBACK_CORRECT[randomCorrect]
    }
  },
  mounted() {
    this.activeView = RESULT_VIEWS.graph
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
.result-page
  display: grid
  grid-template-rows: max-content auto min-content

.result-heading
  font-size: 1.7rem
  padding: 0 0.5rem

.view-heading
  text-transform: uppercase
  font-weight: normal
  letter-spacing: 1px
  font-size: 0.85rem
  text-align: center
  padding: 0.5rem 0

.section
  overflow: hidden
  max-height: 100%
  min-height: 0

.view-tracker
  justify-self: flex-end
  display: flex
  justify-content: center
  width: 100%
  margin: 1rem 0

  .view-dot
    height: 0.5rem
    width: 0.5rem
    background: $color-gray
    border-radius: 50%
    margin: 0 0.25rem

    &.is-active
      background: $color-gray--darker
</style>
