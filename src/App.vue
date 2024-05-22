<template>
  <div class="v-aspect-ratio-img" :style="style">
    <img alt="Hakuto logo" src="./assets/Hakuto_logo.jpg">
  </div>
  <div id="app">
    <div 
      id="nav" 
      class="tab-area-base">
      <ul class="tab-menu-base">
        <!-- `router.js` で定義したルーティングルールとの紐付けを行っている -->
        <li><router-link to="/home">Home Test</router-link></li>
        <li><router-link to="/home2">Home2 Test</router-link></li>
        <li><router-link to="/routing">Rounting Test</router-link></li>
      </ul>
    </div>
    <router-view />
  </div>
</template>

<style>
.v-aspect-ratio-img
  img
    width 30%
    height 30%
    object-fit cover

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
