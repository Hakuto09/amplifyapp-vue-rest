import { createApp } from 'vue'
import App from './App.vue'
//
//createApp(App).mount('#app')

//import Vue from 'vue'
//import App from './App.vue'

// ルーティングのために追加
import router from './router'

//Vue.config.productionTip = false
//
//new Vue({
//    router, // ルーティングのために追加
//    render: h => h(App),
//}).$mount('#app')

const app = createApp(App)
app.use(router)
app.mount('#app')
