<template>
  <div class="page game">
    <page-header v-if="!hasStarted" title="Let’s get Squizzy with it!">
      <input-field
        :label="inputLabel"
        :button-title="buttonTitle"
        :placeholder="placeholder"
        :is-loading="isLoading"
        @click="startGame($event)"
      />
    </page-header>
    <question-choices v-if="hasStarted" :question="question" />
  </div>
</template>

<script>
// TODO: add loading indicator when pressing JOIN GAME
import PageHeader from '@/components/PageHeader'
import QuestionChoices from '@/components/question/QuestionChoices'
import InputField from '@/components/InputField'
export default {
  name: 'Home',
  components: {
    PageHeader,
    QuestionChoices,
    InputField
  },
  data() {
    return {
      isLoading: false,
      hasStarted: false,
      inputLabel: 'What do we call you?',
      buttonTitle: 'Join game',
      placeholder: 'Nickname',
      question: {
        title: 'Approximately how long does it take light from the Sun to reach Earth?',
        options: [
          {
            title: '8 hours',
            _id: 1
          },
          {
            title: '8 minutes',
            _id: 12
          },
          {
            title: '8 seconds',
            _id: 123
          },
          {
            title: '8 milliseconds',
            _id: 1234
          }
        ]
      }
    }
  },
  methods: {
    startGame() {
      this.isLoading = true
      // eslint-disable-next-line no-console
      console.log(this.$route.params.id)
    }
  }
}
</script>
