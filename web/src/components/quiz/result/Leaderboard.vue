<template>
  <div class="leaderboard-wrapper">
    <div class="leaderboard">
      <div class="item" v-for="(player, index) in players" :key="player._id">
        <span class="rank">{{ index + 1 }}</span>
        <span class="name">{{ player.name }}</span>
        <span class="points">{{ player.score }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      players: [{name: 'Vic', score: 100, _id: 1}]
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
  height: 1000px
  padding: 0 1rem

.item
  display: flex
  align-items: center
  min-height: 1em
  font-size: 1.1em
  font-weight: bold
  padding: 0.5rem 1rem
  &:nth-child(odd)
    background: $color-gray--lightest

  .rank
    font-weight: normal
    font-size: 0.85rem
    padding-right: 0.8rem

  .points
    margin-left: auto
</style>
