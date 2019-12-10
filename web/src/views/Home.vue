<template>
  <div class="page home">
    <div v-if="status" class="status">
      <h2 class="title">{{ status.title }}</h2>
      <p>{{ status.message }}</p>
    </div>
    <squizzy-squid />
    <div v-if="match" class="label match-title">
      {{ activeView.name === 'welcome' ? 'JOINING' : 'JOINED' }}: {{ title }}
    </div>
    <div class="label match-title" v-if="!match">Powered by Sanity</div>
    <section v-cloak>
      <transition name="home" mode="out-in">
        <component :is="activeView.component" />
      </transition>
      <div class="match-details" v-if="!status && playerCount">
        <div class="player-count">
          {{ playerCount }}
        </div>
        <div class="label">{{ playerCount > 1 ? 'players have' : 'player has' }} joined</div>
      </div>
    </section>
  </div>
</template>

<script>
import SquizzySquid from '@/components/general/SquizzySquid'
import {mapState, mapGetters} from 'vuex'
const HOME_VIEWS = {
  welcome: {
    name: 'welcome',
    component: () => import(`../components/home/Welcome.vue`)
  },
  register: {
    name: 'register',
    component: () => import(`../components/home/Register.vue`)
  },
  pregame: {
    name: 'pregame',
    component: () => import(`../components/home/Pregame.vue`)
  }
}
export default {
  name: 'Home',
  components: {
    SquizzySquid
  },
  computed: {
    ...mapState('quiz', ['match']),
    ...mapGetters('quiz', ['title', 'playerCount']),
    ...mapState('player', ['player']),
    ...mapState(['status']),
    activeView() {
      // If no match is found
      if (!this.match) {
        // show welcome screen
        return HOME_VIEWS.welcome
      } else if (this.match && !this.player) {
        // register player if no player is registered already
        return HOME_VIEWS.register
      } else {
        // Put player in pregame if there's a match and player
        return HOME_VIEWS.pregame
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.home
  display: grid
  grid-template-rows: min-content min-content min-content auto
  gap: 1rem

.status
  padding: 1rem
  color: $color-white
  background: $color-purple
  border-radius: $border-radius
  text-align: center
  max-width: 450px
  margin: 1rem auto

  .title
    font-size: 1.2em

.match-title
  margin-bottom: 0.5rem

.match-details
  text-align: center
  padding: 2rem 1rem

  .player-count
    font-size: 4rem
</style>
