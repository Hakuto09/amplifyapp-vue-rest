//import Vue from 'vue'
//import Router from 'vue-router'
//import Home from './views/Home.vue'
//import Routing from './views/Routing.vue'

import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Home2 from './views/Home2.vue'
import Routing from './views/Routing.vue'

//Vue.use(Router)

const routes = [
    {
//        path: "/",
        path: "/home",
        name: "home",
        component: Home
    },
    {
        path: "/home2",
        name: "home2",
        component: Home2
    },
    {
        path: "/routing",
        name: "routing",
        component: Routing
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router

//export default new Router({
//  // デフォルトの挙動では URL に `#` が含まれる.
//  // URL から hash を取り除くには `mode:history` を指定する
//  mode: 'history',                  
//  base: process.env.BASE_URL,
//  routes: [
//    {
//      path: '/',
//      name: 'home',
//      component: Home
//    },
//    {
//      path: '/routing',
//      name: 'routing',
//      component: Routing 
//    }
//  ]
//})
