<template>
  <div class="sub-page gameroom">
    <h1 class="page-heading">{{ title }}</h1>
    <p class="page-message">
      {{ message }}
    </p>
  </div>
</template>

<script>
// TODO: Add message if joining a match that already exists
import {mapState} from 'vuex'
export default {
  name: 'Gameroom',
  components: {},
  data() {
    return {
      message: 'Waiting for the Squizmaster to start the game... Get ready! ',
      subMessage: ''
    }
  },
  computed: {
    ...mapState('playerStore', ['player']),
    title() {
      const name = this.player && this.player.name
      return `Welcome ${name ? `${name}` : ''}! `
    }
  }
}
</script>
