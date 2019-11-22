<template>
  <div class="page home">
    <squizzy-page :title="title" :message="message" />
  </div>
</template>

<script>
import SquizzyPage from '@/components/SquizzyPage'
export default {
  name: 'Home',
  components: {
    SquizzyPage
  },
  data() {
    return {
      title: 'Welcome to Squizzy!',
      message: 'Please scan a QR code to get started.'
    }
  }
}
</script>
