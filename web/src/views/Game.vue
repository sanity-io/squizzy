<template>
  <div class="page game">
    <page-header v-if="!hasStarted" title="Let’s get Squizzy with it!">
    </page-header>
    <question-choices v-if="hasStarted" :question="question" />
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader'
import QuestionChoices from '@/components/question/QuestionChoices'
import SquizzyPage from '@/components/SquizzyPage'
import QuestionCard from '@/components/QuestionCard'

export default {
  name: 'Home',
  components: {
    PageHeader,
    QuestionChoices,
    SquizzyPage,
    QuestionCard
  },
  data() {
    return {
      hasStarted: false,
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
      this.hasStarted = true
      // eslint-disable-next-line no-console
      console.log(this.$route.params.id)
    }
  }
}
</script>
