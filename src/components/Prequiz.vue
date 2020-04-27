<template>
  <div class="view prequiz">
    <squizzy-squid :mouth="activeView.expression.mouth" :eyes="activeView.expression.eyes" />
    <div v-if="activeView.status" class="status label">
      {{ activeView.status }}
    </div>
    <h1 class="page-title">{{ activeView.title }}</h1>
    <p v-if="activeView.subtitle" class="page-subtitle">
      {{ activeView.subtitle }}
    </p>
    <register-player v-if="activeView.name === 'register' && !isFinished" @error="setError" />
    <div v-if="!isFinished && !error" class="match-details">
      <div class="player-count">
        {{ playerCount }}
      </div>
      <div class="label">{{ playerCount !== 1 ? 'players have' : 'player has' }} joined</div>
    </div>
    <div v-if="isFinished">
      <h2 class="top-players">Top players</h2>
      <leaderboard class="players" top-players>
        <span slot="crown" slot-scope="player" class="crown" :data-rank="player.index">
          <svg stroke-width="0" viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M528 448H112c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h416c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm64-320c-26.5 0-48 21.5-48 48 0 7.1 1.6 13.7 4.4 19.8L476 239.2c-15.4 9.2-35.3 4-44.2-11.6L350.3 85C361 76.2 368 63 368 48c0-26.5-21.5-48-48-48s-48 21.5-48 48c0 15 7 28.2 17.7 37l-81.5 142.6c-8.9 15.6-28.9 20.8-44.2 11.6l-72.3-43.4c2.7-6 4.4-12.7 4.4-19.8 0-26.5-21.5-48-48-48S0 149.5 0 176s21.5 48 48 48c2.6 0 5.2-.4 7.7-.8L128 416h384l72.3-192.8c2.5.4 5.1.8 7.7.8 26.5 0 48-21.5 48-48s-21.5-48-48-48z"
            ></path>
          </svg>
        </span>
      </leaderboard>
      <p>To play again, please scan<br />a new QR code!</p>
    </div>
  </div>
</template>

<script>
import SquizzySquid from '../components/general/SquizzySquid'
import RegisterPlayer from '../components/general/RegisterPlayer'
const Leaderboard = () => import('../components/result/Leaderboard')
export default {
  components: {
    SquizzySquid,
    RegisterPlayer,
    Leaderboard
  },
  data() {
    return {
      error: false
    }
  },
  computed: {
    isFinished() {
      return this.match.startedAt && this.match.finishedAt
    },

    match() {
      return this.$store.state.matchStore.match
    },

    status() {
      const player = this.$store.state.playerStore.player
      return this.activeView.name !== 'lobby'
        ? `${this.match && player ? 'Joined' : 'Joined'}: ${this.match.quiz.title}`
        : 'Powered by Sanity'
    },

    activeView() {
      // Get the player object from the store
      const player = this.$store.state.playerStore.player
      // Quiz title
      const title = this.match.quiz.title

      if (this.isFinished)
        return {
          name: 'Finished',
          title: 'Thank you for playing!',
          subtitle: 'The match finished, did you have a squid time?',
          status: this.match.quiz.title,
          expression: {mouth: 'happy'}
        }

      // Register for match if no Player
      if (!player)
        return {
          name: 'register',
          title: `Squizzy time!`,
          status: `Joining: ${title}`,
          expression: {eyes: 'happy', mouth: 'default'}
        }

      return {
        name: 'welcome',
        title: `Hello ${player.name}!`,
        subtitle: 'Game is about to start. Waiting for the Squizzmaster...',
        status: `Joined: ${title}`,
        expression: {eyes: 'default', mouth: 'happy'}
      }
    },

    playerCount() {
      return this.$store.getters['matchStore/playerCount']
    }
  },

  mounted() {
    const player = this.$store.state.playerStore.player
    const match = this.$store.state.matchStore.match
    if (player && match && !this.$store.getters['matchStore/isPlayerInMatch']) {
      this.registerExistingPlayer()
    }
  },
  methods: {
    setError(error) {
      this.error = error
    },

    registerExistingPlayer() {
      return this.$store.dispatch('playerStore/registerExistingPlayer').then(response => {
        if (!response) {
          this.error = 'Something went wrong, please try again.'
          this.$emit('error', this.error)
        } else {
          this.error = false
          this.$emit('error', false)
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.prequiz
  display: grid
  grid-template-rows: repeat(4, min-content) auto

.status
  padding-top: 0.5rem

.match-details
  text-align: center
  padding: 1rem

  .player-count
    font-size: 4rem
    @media screen and (max-width: 374px)
      font-size: $font-size-xxlarge

.top-players
  font-size: $font-size-large
  text-align: center
  margin: 1rem 0 0.5rem

.players
  padding-bottom: 1rem

  .crown svg
    height: 1.1rem
    transform: rotate(-10deg)
    padding-right: 0.5rem

  .crown[data-rank="0"] svg
    fill: #FFD84C

  .crown[data-rank="1"] svg
    fill: #A6B2C3

  .crown[data-rank="2"] svg
    fill: #ED7F12
</style>
