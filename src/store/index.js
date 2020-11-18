import Vue from 'vue'
import Vuex from 'vuex'
import AuthModule from './authModule'
import GalleryModule from './galleryModule'
import AuthorModule from './authorModule'

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    AuthModule,
    GalleryModule,
    AuthorModule,
  },


  


});
