<template>
  <div class="question-card">
    <div class="progress label">{{ title }} {{ progress }}</div>
    <div class="question">
      <template v-if="!isAnswerSubmitted">
        <question-image v-if="currentQuestion.image" :asset="currentQuestion.image" />
        <h1
          class="title"
          :class="{
            'title-long': currentQuestion.title.split('').length > 80,
            'title-with-image': currentQuestion.image
          }"
        >
          {{ currentQuestion.title }}
        </h1>
      </template>
      <template v-else>
        <div class="question-status">
          <squizzy-squid class="confirmation-squizzy" eyes="happy" />
          <h1 class="title">Answer submitted!</h1>
          <p>Waiting for other players...</p>
        </div>
      </template>
    </div>
    <question-choices
      :choices="currentQuestion.choices"
      :is-answer-submitted="isAnswerSubmitted"
      @answered="setPlayerClickedCard"
    />
  </div>
</template>

<script>
import QuestionImage from './question/QuestionImage'
import QuestionChoices from './question/QuestionChoices'
import SquizzySquid from './general/SquizzySquid'
import {mapGetters} from 'vuex'
export default {
  components: {
    QuestionImage,
    QuestionChoices,
    SquizzySquid
  },
  data() {
    return {
      playerClickedCard: false
    }
  },
  computed: {
    ...mapGetters('matchStore', ['currentQuestion', 'title', 'progress']),
    isAnswerSubmitted() {
      if (this.playerClickedCard) {
        // shortcut for a more snappy client experience
        return true
      }
      const player = this.$store.state.playerStore.player
      const match = this.$store.state.matchStore.match
      const {answers = []} = match
      return answers.some(
        answer => answer.questionKey === match.currentQuestionKey && answer.player._id === player.id
      )
    }
  },
  methods: {
    setPlayerClickedCard() {
      this.playerClickedCard = true
    }
  }
}
</script>

<style lang="sass" scoped>
.question-card
  flex-grow: 1
  height: 100%
  display: grid
  grid-template-areas: status       question               choices
  grid-template-rows: min-content   minmax(100px, 450px)   1fr
  height: 100%
  width: 100%
  overflow: hidden
  gap: 1rem
  @media screen and (max-height: 1024px)
    grid-template-rows: min-content   minmax(100px, 300px)   1fr
  @media screen and (max-height: 737px)
    grid-template-rows: min-content   minmax(100px, 250px)   1fr
  @media screen and (max-height: 569px)
    grid-template-rows: min-content   minmax(100px, 200px)   1fr

.question
  display: grid
  grid-template-rows: 1fr min-content
  padding: 0 0.5rem

.title
  font-size: 2.5rem
  font-weight: bold
  text-align: center
  margin: auto
  padding-top: 1rem

.title-long
  font-size: $font-size-large

.title-with-image
  font-size: 2rem

.question-status
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center

  .title
    font-size: $font-size-large
    margin: 0
    padding: 0

  .confirmation-squizzy
    max-height: 150px
    margin-top: -0.5rem
</style>
