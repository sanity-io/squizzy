<template>
  <div id="app">
    <the-navbar />
    <router-view />
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar'
export default {
  components: {
    TheNavbar
  }
}
</script>

<style lang="sass">
@import './styles/global.sass'
</style>
