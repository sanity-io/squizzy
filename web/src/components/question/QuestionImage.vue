<template>
  <div class="question-image">
    <img :src="urlFor(asset)" alt="" />
  </div>
</template>

<script>
import client from '../../sanityClient'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

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
      return builder
        .image(asset)
        .width(500)
        .url()
    }
  }
}
</script>

<style lang="sass">
.question-image
  display: flex
  justify-content: center
  max-height: 25vh

  & img
    height: 100%
</style>
