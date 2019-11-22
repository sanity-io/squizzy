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
      message: 'Please scan a QR code to get started.'
    }
  }
}
</script>
