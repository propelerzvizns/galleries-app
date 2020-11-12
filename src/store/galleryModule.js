import galleriesService from '../services/galleriesService'
const galleryModule = {
    namespaced:true,

    state:{
      galleries: [],
      gallery: null,
      current_page : null, 
      lastPage: null,
      searchTerm: ''
    },
    actions:{

     async getGalleries(state, payload){
        const response = await galleriesService.getAll(payload);
        console.log('search page response', payload);
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
        console.log('load more response', payload);
        state.commit('setLoadMoreGalleries', response.data);
        state.commit('setCurrentPage', response.current_page);
      },
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
        console.log(payload);
        state.lastPage = payload;
      },

      setLoadMoreGalleries(state, payload){
        payload.forEach(gallery => {
          state.galleries.push(gallery);
        });
      },
      setSearchTerm(state, paylaod){
        state.searchTerm = paylaod
      }
    },

    getters: {
      galleries: (state) => state.galleries,
      images: (state) => state.images,
      gallery: (state) => state.gallery,
      current_page: (state) => state.current_page,
      lastPage: (state) => state.lastPage,
      searchTerm: (state) => state.searchTerm

    }
}
export default galleryModule;