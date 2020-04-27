<template>
  <button class="btn" :class="`btn-${color}`">
    <div class="inner">
      <transition name="changed" mode="out-in" class="inner">
        <div v-if="!isLoading" key="buttonTitle">{{ title }}</div>
        <spinner v-if="isLoading" key="spinner" />
      </transition>
    </div>
  </button>
</template>

<script>
import Spinner from './Spinner'
export default {
  components: {
    Spinner
  },
  props: {
    color: {
      type: String,
      default: 'green'
    },
    title: {
      type: String,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="sass" scoped>

button
  background: $color-gray--darker
  color: $color-white
  padding: 0
  display: flex
  align-items: stretch
  justify-content: stretch
  flex-direction: column
  border-radius: $border-radius
  max-width: 10rem
  width: 100%
  padding: 0.5rem 1rem
  border: 0
  font: inherit
  font-weight: 600
  text-transform: uppercase
  transition: transform 100ms linear
  border: 1px solid transparent
  &:focus
    outline: 0
  &:focus .inner
    border: 1px dashed $color-white
    margin: 3px
    border-radius: $border-radius
  &:active
    transform: scale(0.98)
    box-shadow: inset 0 0 10px $color-green--darker

.inner
  display: flex
  align-items: center
  justify-content: center
  flex-grow: 1

.btn-red
  background: $color-red

.btn-green
  background: $color-green

.btn-purple
  background: $color-purple

.btn-yellow
  background: $color-yellow
  color: $color-black
  &:focus .inner
    border-color: $color-black

.changed-enter-active, .changed-leave-active
  transition: all 300ms ease-in-out

.changed-enter, .changed-leave-to
  opacity: 0
</style>
