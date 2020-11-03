import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Install BootstrapVue
Vue.use(BootstrapVue)
router.beforeEach((to, from, next) => {
  console.log('GLOBAL GUARD', { meta: to.meta.isAuthRequired });
  if (!to.meta.isAuthRequired) {
    console.log('not required');
    next();
  } else if (!localStorage.getItem('token')) {
    console.log('REDIRECTION');
    next('/login');
  }// else {
  //   console.log('pass');
    // next();
  // }
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
