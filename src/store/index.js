import Vue from 'vue'
import Vuex from 'vuex'
import AuthModule from './authModule'
import GalleryModule from './galleryModule'
import authorService from '../services/authorService';

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    AuthModule,
    GalleryModule,
    AuthorModule: {
      namespaced:true,
      state:{
        author: null
      },
      actions:{
        async getAuthor(state, payload){
          const response = await authorService.getAuthor(payload);
          
          state.commit('setAuthor', response)
        },
      },
      mutations: {
        setAuthor(state, payload){
          state.author = payload;
        },
      },
      getters: {
        author: (state) => state.author
      }
    }
  }
});
