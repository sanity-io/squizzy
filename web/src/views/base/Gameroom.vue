<template>
  <div class="sub-page gameroom">
    <h1 class="page-heading">{{ title }}</h1>
    <p class="page-message">
      <span v-if="!isLoading"> {{ message }}</span>
      <spinner v-if="isLoading" />
    </p>
    <match-status :players="playerCount" :message="statusMessage" />
  </div>
</template>

<script>
import MatchStatus from '@/components/MatchStatus'
import {mapState} from 'vuex'
export default {
  name: 'Gameroom',
  components: {
    MatchStatus
  },
  data() {
    return {
      message: 'Waiting for host...',
      statusMessage: `players joined`
    }
  },
  computed: {
    ...mapState(['match', 'playerCount', 'player', 'isLoading', 'isQuestionOpen']),
    title() {
      const name = this.player && this.player.playerName
      return `Welcome to Squizzy${name ? `, ${name}` : ''}!`
    }
  },
  mounted() {
    this.$store.dispatch('startListener')
  },
  beforeRouteLeave(to, from, next) {
    if (this.isQuestionOpen) {
      next()
    } else {
      console.log('nope')
    }
  }
}
</script>
