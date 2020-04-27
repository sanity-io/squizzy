<template>
  <div class="column-wrapper choice" :data-choice="index">
    <div class="column" :style="{height}">
      <div v-if="playerAnswer" class="symbol player-answer">
        <svg
          v-if="playerAnswer.isCorrect"
          class="is-correct"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 40 40"
        >
          <g>
            <path d="m15 27l17.7-17.7 2.3 2.3-20 20-9.3-9.3 2.3-2.3z"></path>
          </g>
        </svg>
        <svg
          v-else
          class="is-wrong"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
          ></path>
        </svg>
      </div>
    </div>
    <div class="symbol">
      <component :is="symbol" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    playerAnswer: {
      type: [Object, Boolean],
      default: false
    },
    choice: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  computed: {
    symbol() {
      const symbols = ['Circle', 'Star', 'Triangle', 'Square']
      return () => import(`../symbols/${symbols[this.index]}Icon.vue`)
    },
    height() {
      const height = (100 / this.total) * this.choice.answerCount
      return `${height}%`
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../styles/symbols.sass'
.column-wrapper
  flex: 1
  display: flex
  flex-direction: column
  justify-content: flex-end
  align-items: center
  height: 100%
  padding: 0 0.75rem
  padding-top: 2.5rem

.column
  position: relative
  width: 100%
  max-height: 100%
  border-radius: $border-radius
  min-height: 2%

.symbol svg
  height: 1.75rem

.player-answer
  position: absolute
  top: -2.5rem
  left: calc((100% - 2.5rem) / 2)
  svg
    height: 2.5rem

  .is-correct
    fill: $color-green

  .is-wrong
    fill: $color-red
</style>
