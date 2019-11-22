<template>
  <div class="page home">
    <page-header :title="title" :message="message" />
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader'
export default {
  name: 'Home',
  components: {
    PageHeader
  },
  data() {
    return {
      title: 'Welcome to Squizzy!',
      message: 'Please scan the QR code to get started.'
    }
  },
  beforeRouteEnter(to, from, next) {
    if (!to.query.matchFound) {
      next(vm => {
        vm.title = `Oh no! I couldn't find that match...`
        vm.message = `Please scan the QR code to try again.`
      })
    } else {
      next()
    }
  }
}
</script>
