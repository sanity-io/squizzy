<template>
  <div class="register-player">
    <label :for="`input-${label}-id`">{{ label }}</label>
    <input
      class="input"
      :id="`input-${label}-id`"
      type="text"
      v-model.trim="playerName"
      :placeholder="placeholder"
      @keydown.enter="validateName"
      autocomplete="off"
    />
    <v-button @click.native="validateName" :title="buttonTitle" :is-loading="isLoading" />
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
      buttonTitle: 'Join quiz'
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.playerStore.isLoading
    }
  },
  methods: {
    validateName() {
      const name = this.playerName
      if (name) {
        this.$store
          .dispatch('playerStore/registerPlayer', name)
          .then(() => {
            console.log(name, 'has been registered!')
          })
          .catch(() => {
            console.log('something went wrong')
          })
      }
    }
  }
}
</script>

<style lang="sass" scoped>

$max-width: 25ch

.register-player
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  text-align: center

.input
  margin: 1rem 0
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
  max-width: $max-width
  width: 100%

.input::placeholder
  color: $color-gray--darker
</style>
