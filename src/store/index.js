import Vue from 'vue'
import Vuex from 'vuex'
import userService from '../services/userService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedUser: ''
  },
  mutations: {
    setLogin(state, payload){
      state.loggedUser = payload;
    }
  },
  actions: {
    login(state, payload){
      // const loggedUser = userService.login(payload);
      state.commit('setLogin',payload)
      
    }
  },
  getters: {
    loggedUser: (state) => state.loggedUser
  },
  modules: {
  }
})
