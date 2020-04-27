<template>
  <div class="home">
    <squizzy-squid :mouth="expression.mouth" class="home-squizzy" />
    <div v-if="status" class="label">
      <a href="https://sanity.io" target="_blank" rel="noopener noreferrer" class="sanity-link">{{
        status
      }}</a>
    </div>
    <h1 class="page-title">{{ title }}</h1>
    <p class="page-subtitle">{{ subtitle }}</p>
  </div>
</template>

<script>
import SquizzySquid from '@/components/general/SquizzySquid'

export default {
  components: {
    SquizzySquid
  },
  data() {
    return {
      title: 'Welcome to Squizzy!',
      subtitle: 'To play, find a QR code to scan or a URL to follow',
      status: 'Powered by Sanity',
      expression: {mouth: 'happy'}
    }
  },
  beforeRouteEnter(to, from, next) {
    if (to.params.title && to.params.subtitle) {
      next(vm => {
        vm.title = to.params.title
        vm.subtitle = to.params.subtitle
        vm.expression = {eyes: 'default', mouth: 'sad-open'}
      })
    } else {
      next()
    }
  }
}
</script>

<style lang="sass" scoped>
.home-squizzy
  max-height: 250px
</style>
