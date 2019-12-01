<template>
  <div class="page home">
    <squizzy-squid />
    <section v-cloak>
      <transition name="home" mode="out-in">
        <component :is="activeView" />
      </transition>
    </section>
  </div>
</template>

<script>
import SquizzySquid from '@/components/general/SquizzySquid'
import {mapState} from 'vuex'
const HOME_VIEWS = {
  welcome: () => import(`../components/home/Welcome.vue`),
  register: () => import(`../components/home/Register.vue`),
  pregame: () => import(`../components/home/Pregame.vue`)
}
export default {
  name: 'Home',
  components: {
    SquizzySquid
  },
  computed: {
    ...mapState('quiz', ['match']),
    ...mapState('player', ['player']),
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

.page
  display: flex
  flex-direction: column
</style>
