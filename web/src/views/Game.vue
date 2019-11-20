<template>
  <div class="home">
    <squizzy-page title="Let’s get Squizzy with it!">
      <input type="text" />
      <button @click="startGame">Play</button>
    </squizzy-page>
    <question-options />
  </div>
</template>

<script>
import SquizzyPage from '@/components/SquizzyPage'
import QuestionOptions from '@/components/QuestionOptions'
export default {
  name: 'Home',
  components: {
    SquizzyPage,
    QuestionOptions
  },
  methods: {
    startGame() {
      // eslint-disable-next-line no-console
      console.log(this.$route.params.id)
    }
  }
}
</script>
