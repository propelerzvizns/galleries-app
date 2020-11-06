import Vue from 'vue'
import Vuex from 'vuex'
import galleriesService from '../services/galleriesService'
import AuthModule from './authModule'
import authorService from '../services/authorService';

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
   AuthModule,
    GalleryModule: {
      namespaced:true,
      state:{
        galleries: [],
        gallery: null,
        current_page : null, 
        last_page: null
     
      },
      actions:{
       async getGalleries(state){
          const response = await galleriesService.getAll();
          // console.log(response)
          state.commit('setGalleries', response.data);
          state.commit('setCurrentPage', response.current_page)
          state.commit('setLastPage', response.last_page)
        },
        async getGallery(state, payload){
          const response = await galleriesService.getGallery(payload)
          state.commit('setGallery', response);
        },
        async getLoadMore(state){
          const page = state.current_page
          console.log('action load more',page)
          const galleriesLoad = await galleriesService.getAll(page)
          console.log('action load more', galleriesLoad)
        }

        
      },
      mutations: {
        setGalleries(state, payload){
          state.galleries = payload;
        },
        setGallery(state,payload){
          console.log('mutation',payload);
          state.gallery= payload
        },
        setCurrentPage(state,payload){
          state.current_page = payload;
        },
        setLastPage(state, payload){
          state.last_page = payload;
        }
      },
      getters: {
        galleries: (state) => state.galleries,
        images: (state) => state.images,
        gallery: (state) => state.gallery,
        current_page: (state) => state.current_page,
        last_page: (state) => state.last_page,
      }
    },
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
})
