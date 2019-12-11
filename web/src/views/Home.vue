<template>
  <div class="home">
    <squizzy-squid />
    <div v-if="status" class="label">
      {{ status }}
    </div>
    <h1 class="page-title">{{ title }}</h1>
    <p class="page-subtitle">
      {{ subtitle }}
    </p>
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
      subtitle: 'Scan a QR code to get started.',
      status: 'Powered by Sanity'
    }
  },
  beforeRouteEnter(to, from, next) {
    if (to.params.title && to.params.subtitle) {
      next(vm => {
        vm.title = to.params.title
        vm.subtitle = to.params.subtitle
      })
    } else {
      next()
    }
  }
}
</script>
