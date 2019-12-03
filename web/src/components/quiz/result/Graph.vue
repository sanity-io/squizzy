<template>
  <div class="graph-wrapper">
    <div class="graph">
      <div class="column" v-for="value in result" :key="value">
        {{ value }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: [10, 20, 15, 5]
    }
  }
}
</script>

<style lang="sass" scoped>
.graph-wrapper
  height: 600px
</style>
