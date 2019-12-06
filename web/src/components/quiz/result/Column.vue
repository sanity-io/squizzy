<template>
  <div class="column-wrapper choice" :data-choice="index">
    <div class="column" :style="{height: index > 0 ? `${index * 10}%` : '2%'}">
      <div v-if="isCorrect" class="symbol is-correct">
        <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 40 40">
          <g><path d="m15 27l17.7-17.7 2.3 2.3-20 20-9.3-9.3 2.3-2.3z"></path></g>
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
    index: {
      type: Number,
      required: true
    },
    isCorrect: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    symbol() {
      const symbols = ['Circle', 'Star', 'Triangle', 'Square']
      return () => import(`../symbols/${symbols[this.index]}Icon.vue`)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../../styles/symbols.sass'
.column-wrapper
  flex: 1
  display: flex
  flex-direction: column
  justify-content: flex-end
  align-items: center
  height: 100%
  padding: 0 1rem
  padding-top: 2rem

.column
  position: relative
  width: 100%
  max-height: 100%
  border-radius: $border-radius

.symbol svg
  height: 2em

.is-correct
  position: absolute
  top: -3rem
  left: calc((100% - 3rem) / 2)
  svg
    height: 3rem
</style>
