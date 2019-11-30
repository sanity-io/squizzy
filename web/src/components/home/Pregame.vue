<template>
  <div class="sub-page gameroom">
    <h1 class="page-heading">{{ title }}</h1>
    <p class="page-message">
      {{ message }}
    </p>
    <p class="page-message">{{ subMessage }}</p>
    <!-- TODO: Add indicator for how many players have joined -->
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Gameroom',
  components: {},
  data() {
    return {
      message: 'The game is about to start.',
      subMessage: 'Waiting for host...'
    }
  },
  computed: {
    ...mapState('player', ['player']),
    title() {
      const name = this.player && this.player.name
      return `Welcome to Squizzy${name ? `, ${name}` : ''}!`
    }
  }
}
</script>
