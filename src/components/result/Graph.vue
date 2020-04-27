<template>
  <div class="graph-wrapper">
    <div class="graph">
      <v-column
        v-for="(choice, index) in getAnswerDistribution"
        :key="choice.title"
        :choice="choice"
        :index="index"
        :total="totalAnswerCount"
        :player-answer="playerAnswer._key === choice._key ? playerAnswer : false"
      />
    </div>
  </div>
</template>

<script>
import Column from './Column'
import {answerDistribution} from '../../utils'
export default {
  components: {
    'v-column': Column
  },
  computed: {
    match() {
      return this.$store.state.matchStore.match
    },
    totalAnswerCount() {
      const count = this.getAnswerDistribution.reduce((sum, {answerCount}) => sum + answerCount, 0)
      return count
    },
    playerAnswer() {
      return this.$store.getters['playerStore/playerAnswer']
    },
    getAnswerDistribution() {
      return answerDistribution(this.match)
    }
  }
}
</script>

<style lang="sass" scoped>
.graph-wrapper
  height: 100%
  width: 100%
  display: flex
  flex-direction: column
  justify-content: flex-end

.graph
  display: flex
  justify-content: center
  flex: 1
</style>
