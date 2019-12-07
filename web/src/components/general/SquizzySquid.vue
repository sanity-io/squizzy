<template>
  <div class="squizzy-squid">
    <img src="/squizzy-mock.png" alt="Squizzy the Squid" class="squizzy-img" />
  </div>
</template>

<style lang="sass" scoped>
.squizzy-squid
  display: flex
  justify-content: center
  text-align: center
  margin: 1rem auto
  max-height: 15vh
  & img
    object-fit: contain
    width: 100%
  @media screen and (min-width: 321px)
    max-height: 25vh
  @media screen and (min-width: 376px)
    max-height: 30vh
</style>
