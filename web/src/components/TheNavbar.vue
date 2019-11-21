<template>
  <div class="navbar">
    <router-link to="/">{{ $appName }}</router-link>
  </div>
</template>

<style lang="sass" scoped>
.navbar
  background: $color-red
  color: $color-white
  display: flex
  justify-content: space-between
  align-items: center
  min-height: $navbar-height
  font-size: 1.5rem
  font-weight: 700
  text-transform: uppercase
  padding: 0.5rem 1rem
  letter-spacing: 2px
</style>
