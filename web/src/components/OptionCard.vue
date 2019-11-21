<template>
  <div class="option-card" :data-option="index" :class="{disabled: disabled}">
    <input
      class="option-radio"
      type="radio"
      name="options"
      :aria-labelledby="`option-label-${title}`"
      @change="$emit('change', $event)"
      :disabled="disabled"
    />
    <div class="symbol">
      <component :is="icon" />
    </div>
    <h2 class="option-title" :id="`option-label-${title}`">{{ title }}</h2>
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
      return () => import(`./icons/${icons[this.index]}Icon.vue`)
    }
  }
}
</script>

<style lang="sass" scoped>
.option-card
  position: relative
  border-radius: $border-radius
  color: $color-white
  display: flex
  align-items: center
  min-height: 120px

.disabled
  opacity: 0.3

.option-radio
  position: absolute
  top: 0
  bottom: 0
  right: 0
  left: 0
  height: 100%
  width: 100%
  opacity: 0

.option-radio:disabled
  pointer-events: none

.option-title
  flex-grow: 1
  font-size: 1.5rem
  font-weight: normal
  text-align: center
  @media screen and (max-width: 320px)
    font-size: 1.2rem

// Symbol representing option
.symbol
  position: absolute
  top: 0
  left: 0
  padding: 0.25rem

.symbol svg
  height: 1.5rem
  fill: $color-white

// Option 1 - Circle
.option-card[data-option="0"]
  background: $color-red

// Option 2 - Star
.option-card[data-option="1"]
  background: $color-blue

// Option 3 - Triangle
.option-card[data-option="2"]
  background: $color-green

// Option 4 - Square
.option-card[data-option="3"]
  background: $color-purple
</style>
