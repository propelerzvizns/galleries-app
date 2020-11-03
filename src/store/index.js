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
    async login(state){
      const loggedUser = await userService.login();
      state.commit('setLogin', loggedUser);
      
    }
  },
  getters: {
    loggedUser: (state) => state.loggedUser
  },
  modules: {
  }
})
