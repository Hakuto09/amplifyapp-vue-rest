import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//import { store } from './store'

import { Amplify } from "aws-amplify";
import aws_exports from './aws-exports';

import VueLocalStorage from 'vue-localstorage'

console.log("main.js:", " After import: ");

Amplify.configure(aws_exports);
console.log("main.js:", " After Amplify.configure(aws_exports): ");

const app = createApp(App);
console.log("main.js:", " After createApp(App): ");
app.use(router);
console.log("main.js:", " After app.use(router): ");
//app.use(store);
//console.log("main.js:", " After app.use(store): ");
//app.use(VueLocalStorage);
//console.log("main.js:", " After app.use(VueLocalStorage): ");
app.mount('#app');
console.log("main.js:", " After app.mount('#app'): ");
