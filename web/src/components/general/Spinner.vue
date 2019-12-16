<template>
  <div class="spinner" :class="color">
    <div class="circle bounce1"></div>
    <div class="circle bounce2"></div>
    <div class="circle bounce3"></div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="sass" scoped>
.spinner
  text-align: center


.circle
  width: 0.8rem
  height: 0.8rem
  margin: 0 0.5rem
  background: $color-white
  border-radius: 100%
  display: inline-block
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both
  animation: sk-bouncedelay 1.4s infinite ease-in-out both


.inherit .circle
  background: inherit

.spinner .bounce1
  -webkit-animation-delay: -0.32s
  animation-delay: -0.32s


.spinner .bounce2
  -webkit-animation-delay: -0.16s
  animation-delay: -0.16s


@-webkit-keyframes sk-bouncedelay
  0%,
  80%,
  100%
    -webkit-transform: scale(0)

  40%
    -webkit-transform: scale(1)



@keyframes sk-bouncedelay
  0%,
  80%,
  100%
    -webkit-transform: scale(0)
    transform: scale(0)

  40%
    -webkit-transform: scale(1)
    transform: scale(1)
</style>
