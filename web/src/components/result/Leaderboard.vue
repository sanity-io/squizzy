<template>
  <div class="leaderboard-wrapper">
    <ul class="leaderboard">
      <li
        class="item"
        :class="{'current-player': player._id === playerId}"
        v-for="(player, index) in getScoresByPlayer"
        :key="player._id"
      >
        <span class="rank">{{ index + 1 }}</span>
        <span class="name">{{ player.name }}</span>
        <span class="points">{{ Math.round(player.score) }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import {scoresByPlayer} from '../../utils'
export default {
  computed: {
    playerId() {
      return this.$store.state.playerStore.player.id
    },
    getScoresByPlayer() {
      return scoresByPlayer(this.$store.state.matchStore.match)
    }
  },
  mounted() {
    const currentPlayer = this.$el.getElementsByClassName('current-player')[0]
    currentPlayer.scrollIntoView()
  }
}
</script>

<style lang="sass" scoped>
.leaderboard-wrapper
  position: relative
  overflow-y: auto
  height: 100%
  margin: 0 -0.5rem

.leaderboard
  position: absolute
  top: 0
  left: 0
  right: 0
  height: 100%
  width: 100%
  list-style: none
  padding: 0 0.5rem;
  padding-top: 1rem

.item
  display: flex
  align-items: center
  min-height: 1em
  padding: 0.5rem 1rem
  border-radius: 5px
  &:nth-child(odd)
    background: $color-gray--lightest

  .rank
    font-weight: normal
    font-size: $font-size-small
    padding-right: 1rem

  .points
    margin-left: auto

.current-player
  font-weight: bold
  border: 1px solid $color-purple
</style>
