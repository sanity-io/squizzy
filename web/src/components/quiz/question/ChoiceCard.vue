<template>
  <div class="choice-card" :data-choice="index">
    <div class="inner">
      <input
        class="choice-radio"
        type="radio"
        name="choices"
        :aria-labelledby="`choice-label-${title}`"
        @change="$emit('change', $event)"
        :disabled="disabled"
      />
      <div class="symbol">
        <component :is="icon" />
      </div>
      <h2 class="choice-title" :id="`choice-label-${title}`">{{ title }}</h2>
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
      return () => import(`./icons/${icons[this.index]}Icon.vue`)
    }
  }
}
</script>

<style lang="sass" scoped>
.choice-card
  position: relative
  border-radius: $border-radius
  color: $color-white
  padding: 1rem
  opacity: 1
  transition: all 0.4s ease-in-out

.inner
  display: flex
  align-items: center
  height: 100%

// .selected-answer .inner
//   border: 1px dashed $color-white

.disabled
  opacity: 0.3

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

.choice-title
  flex-grow: 1
  font-size: 1.5rem
  font-weight: normal
  text-align: center
  @media screen and (max-width: 320px)
    font-size: 1.2rem

.selected-answer
  animation-name: selected
  animation-duration: 2s
  animation-iteration-count: infinite
  animation-timing-function: ease-in-out

@keyframes selected
  from
    transform: scale(1)
  50%
    transform: scale(0.95)
  to
    transform: scale(1)

// Symbol representing choice
.symbol
  position: absolute
  top: 0
  left: 0
  padding: 0.5rem

.symbol svg
  height: 1.5rem
  fill: $color-white

// choice 1 - Circle
.choice-card[data-choice="0"]
  background: $color-red

// choice 2 - Star
.choice-card[data-choice="1"]
  background: $color-blue

// choice 3 - Triangle
.choice-card[data-choice="2"]
  background: $color-green

// choice 4 - Square
.choice-card[data-choice="3"]
  background: $color-purple
</style>
