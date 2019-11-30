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
    <!-- TODO: Add title of the quiz you're about to join -->
  </div>
</template>

<script>
import InputField from '@/components/InputField'
import {mapState} from 'vuex'
export default {
  name: 'Home',
  components: {
    InputField
  },
  data() {
    return {
      title: `Let's get squizzy with it!`,
      inputLabel: 'What do we call you?',
      buttonTitle: 'Join game',
      inputPlaceholder: 'Nickname'
    }
  },
  computed: {
    ...mapState('quiz', ['match']),
    ...mapState('player', ['isLoading'])
  },
  methods: {
    registerPlayer(playerName) {
      this.$store.dispatch('player/registerPlayer', playerName)
    }
  }
}
</script>
