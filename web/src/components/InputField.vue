<template>
  <div class="input-field">
    <label :for="`input-${label}-id`">{{ label }}</label>
    <input
      class="input"
      :id="`input-${label}-id`"
      type="text"
      v-model="playerName"
      :placeholder="placeholder"
      @keydown.enter="$emit('click', playerName)"
    />
    <v-button
      @click.native="$emit('click', playerName)"
      :title="buttonTitle"
      :isLoading="isLoading"
    />
  </div>
</template>

<script>
import Button from '@/components/Button'
export default {
  components: {
    'v-button': Button
  },
  props: {
    label: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    buttonTitle: {
      type: String,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      playerName: ''
    }
  }
}
</script>

<style lang="sass" scoped>

$max-width: 25ch

.input-field
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center

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
  font-size: 1.8rem
  font-weight: 600
  max-width: $max-width
  width: 100%

.input::placeholder
  color: $color-gray--darker
</style>
