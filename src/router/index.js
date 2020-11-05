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
    component: Login,
    meta: { isAuthRequired: true },

  },

]

const router = new VueRouter({
  routes
});
router.beforeEach((to, from, next) => {
  // const isLoggedIn = !!localStorage.getItem('user');
  // const hasToken = !!localStorage.getItem('token');
  const auth = to.meta.isAuthRequired;
  // console.log('GLOBAL GUARD', { meta: auth});
  // next()
  if (!auth) {
    next();
    // console.log('not required');
  } 
  else if (localStorage.getItem('token')) {
    // console.log('REDIRECTION');
    next('/');
  }
   else {
    // console.log('pass');
    next();
  }
});
export default router
