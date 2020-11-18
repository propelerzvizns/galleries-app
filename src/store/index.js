import Vue from 'vue'
import Vuex from 'vuex'
import AuthModule from './authModule'
import GalleryModule from './galleryModule'
import AuthorModule from './authorModule'
import imagesService from '../services/imagesService'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    imageUrl: ''
  },
  actions:{
   async getImage(state, payload){
      const reponse = await imagesService.getImage(payload);
      state.commit('setImageUrl', reponse);
    }
  },
  mutations:{
    setImageUrl(state, payload){
      state.imageUrl = payload
    }
  },
  getters:{
    imageUrl: (state) => state.imageUrl
  },
  modules: {
    AuthModule,
    GalleryModule,
    AuthorModule,
  },


  


});
