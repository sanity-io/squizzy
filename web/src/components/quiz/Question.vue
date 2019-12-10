<template>
  <div class="question-card">
    <div class="label">Question 1 of 6</div>
    <div class="question-header">
      <question-image v-if="currentQuestion.image" :asset="currentQuestion.image" />
      <h1
        class="question-title"
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
import QuestionImage from './question/QuestionImage'
import QuestionChoices from './question/QuestionChoices'
import {mapGetters} from 'vuex'
export default {
  components: {
    QuestionImage,
    QuestionChoices
  },
  computed: {
    ...mapGetters('quiz', ['currentQuestion'])
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


.question-header
  display: grid
  grid-template-rows: 1fr min-content

.question-title
  font-size: 2rem
  font-weight: normal
  margin: auto
  padding-top: 1rem
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
