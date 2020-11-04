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
        token: localStorage.getItem('token')
      },
      mutations: {
        setLogin(state, payload){
          console.log('set login mutacija', payload);
          state.loggedUser = payload;
        },
        setIsLoggedIn(state, payload){
          state.loggedUser = payload;
        }

      },
      actions: {
        async login(state, payload){
          // console.log('login ation', user);
          const loggedUser = await userService.login(payload);
          
    
          console.log('login atio, got response', loggedUser);
    
          state.commit('setLogin', loggedUser);
    
          // console.log('commit done', loggedUser);
        },

        async getLoggedIn(state){
          console.log('actino')
          if(state.token){
            // const token = window.localStorage.token;
            const isLoggedIn = await userService.getLoggedIn()
            // console.log('actino',isLoggedIn)
            state.commit('setIsLoggedIn', isLoggedIn);
          }

         

         
      
        }
      },
      getters: {
        loggedUser: (state) => state.loggedUser,
        isLoggedIn: (state) => !!state.loggedUser
      }
    }
  }
})
