import { ListGroupPlugin } from 'bootstrap-vue';
import galleriesService from '../services/galleriesService'
const galleryModule = {
    namespaced:true,

    state:{
      galleries: [],
      gallery: null,
      current_page : null, 
      lastPage: null,
      searchTerm: '',
      inputsToDelete: [],
      inputsToCreate: []
    },
    actions:{

     async getGalleries(state, payload){

        const response = await galleriesService.getAll(payload);
        state.commit('setSearchTerm', payload.searchTerm)
        state.commit('setGalleries', response.data);
        state.commit('setCurrentPage', response.current_page);
        state.commit('setLastPage', response.last_page);


      },
      async getGallery(state, payload){

        const response = await galleriesService.getGallery(payload);
        state.commit('setGallery', response)
      },

      async getLoadMore(state, payload){
        const response = await galleriesService.getAll(payload);
        state.commit('setLoadMoreGalleries', response.data);
        state.commit('setCurrentPage', response.current_page);
      },
      async getCreateGallery(state, payload){
        const response = await galleriesService.createGallery(payload);
      },
      getDeleteInput(state, payload){
        state.commit('setDeleteInput', payload);
      },
      getAddInput(state, payload){
        state.commit('setAddInput', payload);
      },
      async getEditGallery(state, payload){
        const response = await galleriesService.editGallery(payload);
        state.commit('setGallery', response)
      },
      async getDeleteGallery(state, payload){
        await galleriesService.deleteGallery(payload);
      }
    },
    mutations: {
      setGalleries(state, payload){
        state.galleries = payload;
      },
      setGallery(state,payload){
        state.gallery= payload
      },
      setCurrentPage(state,payload){
        state.current_page = payload;
      },

      setLastPage(state, payload){
        state.lastPage = payload;
      },

      setLoadMoreGalleries(state, payload){
        payload.forEach(gallery => {
          state.galleries.push(gallery);
        });
      },
      setSearchTerm(state, paylaod){
        state.searchTerm = paylaod
      },
      setDeleteInput(state,payload){
        state.gallery.images.splice(payload.k, 1);
        state.inputsToDelete.push(payload.inputToDelete);

      },
      setAddInput(state, payload){
        var counter = state.gallery.images.length
        state.gallery.images.push({id: counter++})
        state.inputsToCreate.push({id: payload})
      }

    },

    getters: {
      galleries: (state) => state.galleries,
      images: (state) => state.images,
      gallery: (state) => state.gallery,
      current_page: (state) => state.current_page,
      lastPage: (state) => state.lastPage,
      searchTerm: (state) => state.searchTerm,
      inputsToDelete: (state) => state.inputsToDelete

    }
}
export default galleryModule;