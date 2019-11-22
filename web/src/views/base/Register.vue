<template>
  <div class="register">
    <h1 class="page-heading">{{ title }}</h1>
    <input-field
      :label="inputLabel"
      :button-title="buttonTitle"
      :placeholder="inputPlaceholder"
      :is-loading="isLoading"
      @click="registerPlayer($event)"
    />
    <match-status :players="match.players.length" :message="statusMessage" />
  </div>
</template>

<script>
import InputField from '@/components/InputField'
import MatchStatus from '@/components/MatchStatus'
import {mapState} from 'vuex'
export default {
  name: 'Home',
  components: {
    InputField,
    MatchStatus
  },
  data() {
    return {
      title: `Let's get squizzy with it!`,
      isLoading: false,
      inputLabel: 'What do we call you?',
      buttonTitle: 'Join game',
      inputPlaceholder: 'Nickname',
      statusMessage: 'players have joined'
    }
  },
  computed: {
    ...mapState(['match', 'player'])
  },
  methods: {
    registerPlayer(playerName) {
      // TODO:
      // - Register player
      // - push route to PreMatch if successfull?
      this.$store.dispatch('registerPlayer', playerName)
      this.$router.push({name: 'gameroom'})
    }
  }
}
</script>
