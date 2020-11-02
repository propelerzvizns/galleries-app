import Vue from 'vue'
import VueRouter from 'vue-router'
import Galleries from '../views/Galleries.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'galleries-app',
    component: Galleries
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },

]

const router = new VueRouter({
  routes
})

export default router
