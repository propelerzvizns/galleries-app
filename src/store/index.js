import Vue from 'vue'
import Vuex from 'vuex'
import userService from '../services/userService'

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    AuthModule: {
      namespaced:true,
      state: {
        loggedUser: JSON.parse(localStorage.getItem('user')),
        token: localStorage.getItem('token'),
      
      },
      mutations: {
        setLogin(state, payload){
          // console.log('set login mutacija', payload);
          state.loggedUser = payload;
        },
        setIsLoggedIn(state, payload){
          console.log('set is logged mutacija', payload);
          state.loggedUser = payload;
        },
        setLogoutUser(state){
          state.loggedUser =  ''
        }
      },
      actions: {
        async login(state, payload){
         const response = await  userService.login(payload)
         const loggedUser = response.data.user;
        //  console.log('actiob',loggedUser)
              state.commit('setLogin', loggedUser);
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('user', JSON.stringify(response.data.user));
        },

        async getLoggedIn(state){
          if(state.token){
            const isLoggedIn = await userService.getLoggedIn()
          }
          state.commit('setIsLoggedIn', isLoggedIn);
        },
       async getLogout(state, payload){
         await userService.logout(payload).then(response => {
          console.log('then token', payload);
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          state.commit('setLogoutUser')
          
        })
        }
      },
      getters: {
        loggedUser: (state) => state.loggedUser,
        isLoggedIn: (state) => !!state.loggedUser,
 
      }
    }
  }
})
