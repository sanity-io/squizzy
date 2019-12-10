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
  </div>
</template>

<script>
import InputField from './register/InputField'
import {mapState} from 'vuex'
export default {
  name: 'Home',
  components: {
    InputField
  },
  data() {
    return {
      title: `It's squizzy time!`,
      inputLabel: 'What do we call you?',
      buttonTitle: 'Join game',
      inputPlaceholder: 'Nickname',
      errorMessage: false
    }
  },
  computed: {
    ...mapState('matchStore', ['match']),
    ...mapState('playerStore', ['player', 'isLoading'])
  },
  methods: {
    registerPlayer(playerName) {
      this.$store
        .dispatch('playerStore/registerPlayer', playerName)
        .then(() => {
          console.log(playerName, 'has been registered!')
        })
        .catch(() => {
          this.errorMessage = 'Something went wrong :( Please try again!'
        })
    }
  }
}
</script>
