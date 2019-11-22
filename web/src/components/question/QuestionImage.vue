<template>
  <div class="question-image">
    <img :src="urlFor(asset.source)" alt="" />
  </div>
</template>

<script>
export default {
  props: {
    asset: {
      type: Object,
      required: true
    }
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    urlFor(asset) {
      // build url
    }
  }
}
</script>

<style lang="sass">
.question-image
  display: flex
  justify-content: center
  max-height: 20vh

  & img
    height: 100%
</style>
