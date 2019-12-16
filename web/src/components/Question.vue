<template>
  <div class="question-card">
    <div class="progress label">{{ title }} {{ progress }}</div>
    <div class="question">
      <question-image
        v-if="currentQuestion.image"
        :asset="currentQuestion.image"
      />
      <h1
        class="title"
        :class="{
          'title-long': currentQuestion.title.split('').length > 80,
          'title-with-image': currentQuestion.image
        }"
      >
        {{ currentQuestion.title }}
      </h1>
    </div>
    <question-choices :choices="currentQuestion.choices" />
  </div>
</template>

<script>
import QuestionImage from "./question/QuestionImage";
import QuestionChoices from "./question/QuestionChoices";
import { mapGetters } from "vuex";
export default {
  components: {
    QuestionImage,
    QuestionChoices
  },
  computed: {
    ...mapGetters("matchStore", ["currentQuestion", "title", "progress"])
  }
};
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
</style>
