<template>
  <div :class="$style.component">
    <!-- img 
      alt="Vue logo" 
      src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" / -->
    <img 
      alt="Hakuto logo" 
      src="../assets/Hakuto_logo_small.jpg">
    <h1>Welcome to Your Vue.js App</h1>
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
  margin-top: /*50*/100px;
}

h1 {
  font-size: 36px;
}
</style>
