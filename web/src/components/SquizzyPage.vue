<template>
  <div class="squizzy-page">
    <div class="header">
      <squizzy-squid />
      <h1 class="heading-1">{{ title }}</h1>
      <p v-if="message" class="par">{{ message }}</p>
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
</style>
