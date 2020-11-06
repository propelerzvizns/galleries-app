import Vue from 'vue'
import Vuex from 'vuex'

import galleriesService from '../services/galleriesService'
import AuthModule from './authModule'

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
   AuthModule,
    GalleryModule: {
      namespaced:true,
      state:{
        galleries: [],
        gallery: null
     
      },
      actions:{
       async getGalleries(state){
          const galleries = await galleriesService.getAll();
          state.commit('setGalleries', galleries);
        },
        async getGallery(state, payload){
          const response = await galleriesService.getGallery(payload)
      
          state.commit('setGallery', response);
          
        }

        
      },
      mutations: {
        setGalleries(state, payload){
          state.galleries = payload;
        },
        setGallery(state,payload){
          console.log('mutation',payload);
          state.gallery= payload
        }
      },
      getters: {
        galleries: (state) => state.galleries,
        images: (state) => state.images,
        gallery: (state) => state.gallery
      }
    }
  }
})
