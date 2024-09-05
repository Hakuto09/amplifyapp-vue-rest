import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Users from './views/Users.vue'
import LifeCycle from './views/LifeCycle.vue'
import LifeCycle2 from './views/LifeCycle2.vue'
import UserDetail from './views/UserDetail.vue'
import Routing from './views/Routing.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/routing',
    name: 'routing',
    component: Routing 
  },
  {
    path: '/life-cycle',
    name: 'llfe-cycle',
    component: LifeCycle 
  },
  {
    path: '/life-cycle2',
    name: 'llfe-cycle2',
    component: LifeCycle2 
  },
  {
    path: '/users',
    name: 'users',
    component: Users
  },
  {
    path: '/users/:id',
    name: 'user-detail',
    component: UserDetail 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
