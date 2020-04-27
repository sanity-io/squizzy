<template>
  <div class="choice-card choice" :data-choice="index">
    <div class="card">
      <div class="inner">
        <input
          class="choice-radio"
          type="radio"
          name="choices"
          :aria-labelledby="`choice-label-${title}`"
          :disabled="disabled"
          @change="$emit('change', $event)"
        />
        <div class="symbol">
          <component :is="icon" />
        </div>
        <h2 :id="`choice-label-${title}`" class="choice-title">{{ title }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    icon() {
      const icons = ['Circle', 'Star', 'Triangle', 'Square']
      return () => import(`../symbols/${icons[this.index]}Icon.vue`)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../styles/symbols.sass'
.choice-card
  position: relative

.card
  border-radius: $border-radius
  color: $color-white
  padding: 1rem
  opacity: 1
  transition: all 0.4s ease-in-out

.inner, .card
  display: flex
  align-items: center
  justify-content: center
  height: 100%

.choice-radio
  position: absolute
  top: 0
  bottom: 0
  right: 0
  left: 0
  height: 100%
  width: 100%
  opacity: 0

.choice-radio:disabled
  pointer-events: none

.disabled
  pointer-events: none
  &:not(.selected-answer)
    opacity: 0.4
    transition: all 0.4s ease-in-out

.choice-title
  flex-grow: 1
  font-size: $font-size-large
  font-weight: normal
  text-align: center
  @media screen and (max-width: 320px)
    font-size: $font-size-medium

// Symbol representing choice
.symbol
  position: absolute
  top: 0
  left: 0
  padding: 0.5rem

.symbol svg
  height: 1.5rem
  fill: $color-white
</style>
