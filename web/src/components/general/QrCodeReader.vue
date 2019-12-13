<template>
  <qrcode-stream class="qrcode" @decode="onDecode"></qrcode-stream>
</template>
<script>
import {QrcodeStream} from 'vue-qrcode-reader'
import router from '@/router'

export default {
  components: {
    QrcodeStream
  },
  methods: {
    onDecode(decodedString) {
      router.push({name: 'match', params: {slug: decodedString}})
    }
  }
}
</script>

<style lang="sass" scoped>
.qrcode
  padding-top: 1em

</style>
