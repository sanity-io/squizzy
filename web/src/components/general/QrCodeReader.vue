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
    onDecode(decodedString) {
      console.log(decodedString)
    }
  }
}
</script>

<style lang="sass" scoped>
.qrcode
  padding-top: 1em

</style>
