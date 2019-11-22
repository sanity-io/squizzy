<template>
  <div class="register">
    <h1 class="page-heading">{{ title }}</h1>
    <p class="page-message">{{ message }}</p>
    <match-status :players="match.players.length" :message="statusMessage" />
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
      title: `Welcome to Squizzy, ${this.player.name}!`,
      message: 'Waiting for host...',
      statusMessage: `player${this.match.players.length > 1 ? 's have' : ' has'} joined.`
    }
  },
  computed: {
    ...mapState(['match', 'player'])
  }
}
</script>
