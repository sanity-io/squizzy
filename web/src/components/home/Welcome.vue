<template>
  <div class="welcome">
    <h1 class="page-heading">{{ title }}</h1>
    <p class="page-message">{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  data() {
    return {
      title: 'Welcome to Squizzy!',
      message: 'Scan a QR code to get started.'
    }
  },
  beforeRouteEnter(to, from, next) {
    if (to.params.error) {
      const {error} = to.params
      next(vm => {
        vm.title = error.title
        vm.message = error.message
      })
    } else {
      next()
    }
  }
}
</script>
