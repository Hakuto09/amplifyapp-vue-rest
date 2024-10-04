import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//import { store } from './store'

import { Amplify } from "aws-amplify";
import aws_exports from './aws-exports';

//import VueLocalStorage from 'vue-localstorage'
const fileName = "main.js";

console.log(fileName, ":After import: ");

Amplify.configure(aws_exports);
console.log(fileName, ":After Amplify.configure(aws_exports): ");

const app = createApp(App);
console.log(fileName, ":After createApp(App): ");
app.use(router);
console.log(fileName, ":After app.use(router): ");
//app.use(cors({origin: true, credentials: true}));
//console.log(fileName, ":After app.use(cors()): ");
//app.use(store);
//console.log(fileName, ":After app.use(store): ");
//app.use(VueLocalStorage);
//console.log(fileName, ":After app.use(VueLocalStorage): ");
app.mount('#app');
console.log(fileName, ":After app.mount('#app'): ");
