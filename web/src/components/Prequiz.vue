<template>
  <div class="view prequiz">
    <squizzy-squid :expression="activeView.expression" />
    <div class="label" v-if="status">
      {{ status }}
    </div>
    <h1 class="page-title">{{ activeView.title }}</h1>
    <p v-if="activeView.subtitle" class="page-subtitle">
      {{ activeView.subtitle }}
    </p>
    <register-player v-if="activeView.name === 'register'" />
    <div class="match-details">
      <div class="player-count">
        {{ playerCount }}
      </div>
      <div class="label">{{ playerCount !== 1 ? 'players have' : 'player has' }} joined</div>
    </div>
  </div>
</template>

<script>
import SquizzySquid from '../components/general/SquizzySquid'
import RegisterPlayer from '../components/general/RegisterPlayer'
export default {
  components: {
    SquizzySquid,
    RegisterPlayer
  },
  computed: {
    status() {
      const match = this.$store.state.matchStore.match
      const player = this.$store.state.playerStore.player
      return this.activeView.name !== 'lobby'
        ? `${match && player ? 'Joined' : 'Joined'}: ${match.quiz.title}`
        : 'Powered by Sanity'
    },
    activeView() {
      // Get the player object from the store
      const player = this.$store.state.playerStore.player

      // Register for match if no Player
      if (!player)
        return {
          name: 'register',
          title: `Squizzy time!`,
          expression: {eyes: 'happy', mouth: 'default'}
          // component: () => import('../components/home/Register')
        }

      const match = this.$store.state.matchStore.match
      const isPlayerInMatch = match.players.some(player => player._id === player.id)
      // Wait in lobby if there is a match and we have a player
      if (isPlayerInMatch) {
        return {
          name: 'lobby',
          title: `Welcome ${player.name}!`,
          subtitle: `Waiting for the Squizmaster to start the game... Get ready!`,
          expression: {eyes: 'default', mouth: 'happy'}
          // component: () => import('../components/Lobby')
        }
      }
      const playerHasLeftMatch = player && match && !isPlayerInMatch

      const subtitle = playerHasLeftMatch
        ? `You've left the match`
        : 'Scan a QR code to get started!'
      return {
        name: 'welcome',
        title: `Hello ${player.name}!`,
        subtitle,
        expression: {eyes: 'default', mouth: playerHasLeftMatch ? 'sad' : 'happy'}
      }
    },
    playerCount() {
      return this.$store.getters['matchStore/playerCount']
    }
  }
}
</script>

<style lang="sass" scoped>
.prequiz
  display: grid
  grid-template-rows: repeat(4, min-content) auto

.match-details
  text-align: center
  padding: 2rem 1rem
  @media screen and (max-width: 374px)
    padding: 1rem

  .player-count
    font-size: 4rem
    @media screen and (max-width: 374px)
      font-size: $font-size-xlarge
</style>
