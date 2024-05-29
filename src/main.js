import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'

import { Amplify } from "aws-amplify";
import aws_exports from './aws-exports';

console.log("main.js:", " Before Amplify.configure(aws_exports): ");
Amplify.configure(aws_exports);
console.log("main.js:", " After Amplify.configure(aws_exports): ");

const app = createApp(App)
console.log("main.js:", " After createApp(App): ");
app.use(router)
console.log("main.js:", " After app.use(router): ");
app.use(store)
console.log("main.js:", " After app.use(store): ");
app.mount('#app')
console.log("main.js:", " After app.mount('#app'): ");
