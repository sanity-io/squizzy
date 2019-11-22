<template>
  <div class="page game">
    <page-header :match="match.title" title="Let’s get Squizzy with it!">
      <input-field
        :label="inputLabel"
        :button-title="buttonTitle"
        :placeholder="inputPlaceholder"
        :is-loading="isLoading"
        @click="enterGame($event)"
      />
    </page-header>
    <match-status :players="match.players.length" :message="statusMessage" />
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader'
import InputField from '@/components/InputField'
import MatchStatus from '@/components/MatchStatus'
import {mapState} from 'vuex'
export default {
  name: 'Home',
  components: {
    PageHeader,
    InputField,
    MatchStatus
  },
  data() {
    return {
      isLoading: false,
      inputLabel: 'What do we call you?',
      buttonTitle: 'Join game',
      inputPlaceholder: 'Nickname',
      statusMessage: 'players have joined'
    }
  },
  computed: {
    ...mapState(['match'])
  },
  methods: {
    enterGame(playerName) {
      console.log(playerName)
    }
  }
}
</script>
