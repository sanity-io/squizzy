<template>
  <div class="sub-page register">
    <h1 class="page-heading">{{ title }}</h1>
    <input-field
      :label="inputLabel"
      :button-title="buttonTitle"
      :placeholder="inputPlaceholder"
      :is-loading="isLoading"
      @click="registerPlayer($event)"
    />
    <!-- <match-status :players="playerCount" :message="statusMessage" /> -->
    <div class="match-info">
      <p>Quiz</p>
      <p>
        {{ match.title }}
      </p>
      <p v-if="$route.params.message">
        {{ $route.params.message }}
      </p>
    </div>
  </div>
</template>

<script>
import InputField from '@/components/InputField'
// import MatchStatus from '@/components/MatchStatus'
import {mapState} from 'vuex'
export default {
  name: 'Home',
  components: {
    InputField
    // MatchStatus
  },
  data() {
    return {
      title: `Let's get squizzy with it!`,
      inputLabel: 'What do we call you?',
      buttonTitle: 'Join game',
      inputPlaceholder: 'Nickname',
      statusMessage: 'players have joined'
    }
  },
  computed: {
    ...mapState(['match', 'playerCount', 'isLoading'])
  },
  methods: {
    registerPlayer(playerName) {
      this.$store.dispatch('registerPlayer', playerName)
    }
  }
}
</script>
