<template>
  <qrcode-stream class="qrcode" @decode="onDecode"></qrcode-stream>
</template>
<script>
import {QrcodeStream} from 'vue-qrcode-reader'

export default {
  components: {
    QrcodeStream
  },
  methods: {
    onDecode(string) {
      const decodedString = string.split('/match/')[1]
      this.$router.push({name: 'match', params: {slug: decodedString}})
    }
  }
}
</script>

<style lang="sass" scoped>
.qrcode
  padding-top: 1em
  max-width: 200px
  max-height: 200px
  margin: 0 auto
</style>
