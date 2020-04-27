<template>
  <div class="leaderboard-wrapper" :class="{'top-players-wrapper': topPlayers}">
    <ul class="leaderboard" :class="{'top-players': topPlayers}">
      <li
        v-for="(player, index) in getScoresByPlayer"
        :key="player._id"
        class="item"
        :class="{'current-player': player._id === playerId}"
      >
        <slot name="crown" :index="index" :aria-label="index + 1" role="img" />
        <span v-if="!topPlayers" class="rank">{{ index + 1 }}</span>
        <span class="name">{{ player.name }}</span>
        <span class="points">{{ Math.round(player.score) }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import {scoresByPlayer} from '../../utils'
export default {
  props: {
    topPlayers: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    playerId() {
      return this.$store.state.playerStore.player.id
    },
    getScoresByPlayer() {
      return this.topPlayers
        ? scoresByPlayer(this.$store.state.matchStore.match).slice(0, 3)
        : scoresByPlayer(this.$store.state.matchStore.match)
    }
  },
  mounted() {
    const currentPlayer = this.$el.getElementsByClassName('current-player')[0]
    if (currentPlayer) return currentPlayer.scrollIntoView()
  }
}
</script>

<style lang="sass" scoped>
.leaderboard-wrapper
  position: relative
  overflow-y: auto
  height: 100%
  width: 100%

.leaderboard
  position: absolute
  top: 0
  left: 0
  right: 0
  height: 100%
  width: 100%
  list-style: none
  padding: 0
  padding-top: 1rem

.top-players-wrapper
  height: auto

.top-players
  position: static
  padding: 0
  margin: 0 1rem
  width: auto
  height: auto

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

  .crown
    padding-right: 0.5rem

.current-player
  font-weight: bold
  border: 1px solid $color-purple
</style>
