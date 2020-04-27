<template>
  <div class="question-image">
    <img class="image-src" :src="urlFor(asset)" alt="" />
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
  max-height: 350px
  overflow: hidden

.image-src
  object-fit: contain
  padding: 0 1rem
  width: 100%
</style>
