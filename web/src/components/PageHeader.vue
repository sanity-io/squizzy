<template>
  <div class="squizzy-page">
    <div class="header">
      <squizzy-squid />
      <h1 class="heading">{{ title }}</h1>
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

.heading
  font-size: 2rem
  margin-bottom: 0.5rem

.message
  max-width: 20ch
  margin: 0 auto
</style>
