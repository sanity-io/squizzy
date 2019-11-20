<template>
  <div class="home">
    <squizzy-page title="Welcome to Squizzy!" message="Please scan a QR code to get started." />
  </div>
</template>

<script>
import SquizzyPage from '@/components/SquizzyPage'
export default {
  name: 'Home',
  components: {
    SquizzyPage
  }
}
</script>
