<template>
  <div :class="$style.component">
    <img 
      alt="Vue logo" 
      src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ を指定することで `/src` の代替となる
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomePage',
  components: {
    HelloWorld
  }
}
</script>

<style module>
.component {
  margin-top: 50px;
}
</style>
