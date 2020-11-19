import Vue from 'vue'
import VueRouter from 'vue-router'
import Galleries from '../views/Galleries.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Gallery from '../views/Gallery.vue'
import Author from '../views/Author.vue'
import CreateGallery from '../views/CreateGallery.vue'
import Picture from '../views/Picture.vue'


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
    meta: { isAuthRequired: false },

  },
  {
    path: '/register',
    name: 'register-user',
    component: Register,
    meta: { isAuthRequired: false },

  },
  {
    path: '/galleries/:id',
    name: 'gallery',
    component: Gallery,
    meta: { isAuthRequired: false },

  },
  {
    path: '/author/:id',
    name: 'author',
    component: Author,
    meta: { isAuthRequired: true },

  },
  {
    path: '/create',
    name: 'create',
    component: CreateGallery,
    meta: { isAuthRequired: true },

  },
  {
    path: '/my-galleries/:id',
    name: 'my-galleries',
    component: Galleries,
    meta: { isAuthRequired: true },

  },
  {
    path: '/image/:id',
    name: 'image',
    component: Picture,
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
    // console.log('not required' , !auth);
    return;
  } 
  
  if (localStorage.getItem('token')) {
    // console.log('REDIRECTION');
    next();
  }
   else {
    // console.log('pass');
    next('/');
  }
});
export default router
