<template>
  <div class="question-options" :data-grid="options.length">
    <option-card
      v-for="(option, index) in options"
      :key="option.title"
      :title="option.title"
      :index="index"
      @change="selectAnswer(option._id)"
      :disabled="hasAnswered && selectedAnswer !== option._id"
    />
  </div>
</template>

<script>
import OptionCard from '@/components/OptionCard'
export default {
  components: {
    OptionCard
  },
  data() {
    return {
      hasAnswered: false,
      selectedAnswer: null
    }
  },
  computed: {
    options() {
      return [
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
  },
  methods: {
    selectAnswer(id) {
      this.hasAnswered = true
      this.selectedAnswer = id
      // eslint-disable-next-line no-console
      console.log(id)
    }
  }
}
</script>

<style lang="sass" scoped>
.question-options
  display: grid
  grid-template-columns: 1fr 1fr
  gap: 0.5rem
  padding: 0.5rem

.question-options[data-grid="3"] .option-card:last-child
  grid-column: 1 / -1
</style>
