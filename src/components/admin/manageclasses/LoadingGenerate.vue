<template>
  <div class="text-center">
    <v-progress-circular :indeterminate="true" :rotate="360" :size="100" :width="15" color="primary"></v-progress-circular>
  </div>
</template>

<script>
export default {
  data () {
    return {
      interval: -1,
      value: 0,
    }
  },
  // No necesitas usar setInterval si estás haciendo el loading indeterminado
  // mounted () {
  //   this.interval = setInterval(() => {
  //     if (this.value === 100) {
  //       return (this.value = 0)
  //     }
  //     this.value += 10
  //   }, 1000)
  // },
  beforeUnmount () {
    clearInterval(this.interval)
  },
}
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
