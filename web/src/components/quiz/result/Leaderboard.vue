<template>
  <div class="leaderboard-wrapper">
    <div class="leaderboard">
      <div class="item" v-for="(player, index) in getScoresByPlayer" :key="player._id">
        <span class="rank">{{ index + 1 }}</span>
        <span class="name">{{ player.name }}</span>
        <span class="points">{{ player.score }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {scoresByPlayer} from '../../../utils'
export default {
  computed: {
    getScoresByPlayer() {
      return scoresByPlayer(this.$store.state.quiz.match)
    }
  }
}
</script>

<style lang="sass" scoped>
.leaderboard-wrapper
  position: relative
  overflow-y: auto
  height: 100%

.leaderboard
  position: absolute
  top: 0
  left: 0
  right: 0
  height: 100%
  width: 100%
  padding-top: 1rem

.item
  display: flex
  align-items: center
  min-height: 1em
  padding: 0.5rem 1rem
  &:nth-child(odd)
    background: $color-gray--lightest

  .rank
    font-weight: normal
    font-size: $font-size-small
    padding-right: 1rem

  .points
    margin-left: auto
</style>
