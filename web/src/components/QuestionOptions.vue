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
import {mapState} from 'vuex'
export default {
  components: {
    OptionCard
  },
  props: {
    options: {
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
      this.$store.dispatch('stopCountdown')
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
