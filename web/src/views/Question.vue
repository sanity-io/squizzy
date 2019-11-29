<template>
  <div class="question-card">
    <div class="quiz-status">Question 1 of 6</div>
    <div class="question-header">
      <question-image v-if="currentQuestion.image" :asset="currentQuestion.image.asset" />
      <h1
        class="heading"
        :class="{
          'heading-long': currentQuestion.title.split('').length > 80,
          'heading-img': currentQuestion.image
        }"
      >
        {{ currentQuestion.title }}
      </h1>
    </div>
    <question-choices :choices="currentQuestion.choices" />
  </div>
</template>

<script>
import QuestionImage from '@/components/question/QuestionImage'
import QuestionChoices from '@/components/question/QuestionChoices'
import {mapState} from 'vuex'

export default {
  components: {
    QuestionImage,
    QuestionChoices
  },
  computed: {
    ...mapState(['currentQuestion'])
  }
}
</script>

<style lang="sass" scoped>
.question-card
  flex-grow: 1
  height: 100%
  display: grid
  grid-template-areas: status       question  options
  grid-template-rows:  min-content  1fr       1.2fr
  height: 100%
  width: 100%
  overflow: hidden

.quiz-status
  text-transform: uppercase
  letter-spacing: 1px
  font-size: 0.9rem
  text-align: center
  padding: 0.75rem 0.5rem

.question-header
  display: flex
  flex-direction: column
  flex-grow: 0
  min-width: 0

.heading
  font-size: 2rem
  font-weight: normal
  margin: auto
  padding: 0 0.5rem
  @media screen and (max-width: 320px)
    font-size: 1.5rem

.heading-img
  margin: auto 0

.heading-long
  font-size: 1.8rem
  @media screen and (max-width: 320px)
    font-size: 1.3rem

.heading-large.heading-long
  font-size: 2rem
  @media screen and (max-width: 320px)
    font-size: 1.8rem

.heading-large
  grid-row: 1 / -1
  font-size: 2.5rem
  @media screen and (max-width: 320px)
    font-size: 2rem
</style>
