<template>
  <div class="squizzy-page">
    <div class="header">
      <h1 v-if="match" class="match-title">{{ match }}</h1>
      <squizzy-squid />
      <h2 class="heading">{{ title }}</h2>
      <p v-if="message" class="message">{{ message }}</p>
    </div>
    <slot />
  </div>
</template>

<script>
import SquizzySquid from '@/components/SquizzySquid'
export default {
  components: {
    SquizzySquid
  },
  props: {
    match: {
      type: [String, Boolean],
      default: false
    },
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="sass" scoped>
.squizzy-page
  text-align: center

.match-title
  margin: 0.5rem 0
  font-size: 1rem
  font-weight: normal
  text-transform: uppercase
  letter-spacing: 1px

.heading
  font-size: 2rem
  margin-bottom: 0.5rem

.message
  max-width: 20ch
  margin: 0 auto
</style>
