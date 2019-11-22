<template>
  <div class="question-choices" :data-grid="choices.length">
    <choice-card
      v-for="(choice, index) in choices"
      :key="choice.title"
      :title="choice.title"
      :index="index"
      @change="selectAnswer(choice._id)"
      :disabled="hasAnswered && selectedAnswer !== choice._id"
    />
  </div>
</template>

<script>
import ChoiceCard from '@/components/question/ChoiceCard'
import {mapState} from 'vuex'
export default {
  components: {
    ChoiceCard
  },
  props: {
    choices: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedAnswer: null
    }
  },
  computed: {
    ...mapState(['hasAnswered'])
  },
  methods: {
    selectAnswer(id) {
      this.selectedAnswer = id
      this.$store.dispatch('getAnswer', id)
    }
  }
}
</script>

<style lang="sass" scoped>
.question-choices
  display: grid
  grid-template-columns: 1fr 1fr
  gap: 0.5rem
  padding: 0.5rem

.question-choices[data-grid="3"] .choice-card:last-child
  grid-column: 1 / -1
</style>
