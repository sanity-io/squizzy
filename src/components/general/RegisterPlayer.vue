<template>
  <div class="register-player">
    <label :for="`input-${label}-id`">{{ label }}</label>
    <input
      :id="`input-${label}-id`"
      v-model.trim="playerName"
      class="input"
      type="text"
      :placeholder="placeholder"
      autocomplete="off"
      @keydown.enter="validateName"
    />
    <v-button :title="buttonTitle" :is-loading="isLoading" @click.native="validateName" />
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script>
import Button from '@/components/general/Button'
export default {
  components: {
    'v-button': Button
  },
  data() {
    return {
      label: 'What do we call you?',
      placeholder: 'Nickname',
      playerName: null,
      buttonTitle: 'Join quiz',
      error: false
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.playerStore.isLoading
    }
  },
  watch: {
    playerName() {
      if (this.error) {
        this.error = false
        this.$emit('error', false)
      }
    }
  },
  methods: {
    validateName() {
      const name = this.playerName
      if (name) {
        this.registerNewPlayer()
      }
    },

    registerNewPlayer() {
      return this.$store
        .dispatch('playerStore/registerNewPlayer', this.playerName)
        .then(response => {
          if (!response) {
            this.error = 'Something went wrong, please try again.'
            this.$emit('error', this.error)
          } else {
            this.error = false
            this.$emit('error', false)
          }
        })
    }
  }
}
</script>

<style lang="sass" scoped>

.register-player
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  text-align: center

.input
  margin: 1rem
  color: inherit
  font: inherit
  outline: 0
  background: 0
  border: 1px solid $color-gray
  -webkit-appearance:none
  border-radius: $border-radius
  padding: 0.5rem 1rem
  text-align: center
  font-size: $font-size-large
  font-weight: 600
  max-width: 18rem
  width: 100%

.input::placeholder
  color: $color-gray--darker

.error-message
  margin-top: 0.5rem
  max-width: 250px
</style>
