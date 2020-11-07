import galleriesService from '../services/galleriesService'
const galleryModule = {
    namespaced:true,
    state:{
      galleries: [],
      gallery: null,
      current_page : null, 
      lastPage: null,

   
    },
    actions:{
     async getGalleries(state, payload){
      //probaj if string uradi search 
      //        if number setLOadMore
      // if(typeof payload !== 'string'){
      //   var nextPage = payload;
      // } else{
        var searchTerm = payload;
      // }
      //  console.log('searchTerm', searchTerm);
      //  console.log('nextPage', nextPage);
        const response = await galleriesService.getAll(searchTerm);
        state.commit('setGalleries', response.data);
        // state.commit('setLoadMoreGalleries', response.data);
        state.commit('setCurrentPage', response.current_page);
        state.commit('setLastPage', response.last_page);
      },
      async getGallery(state, payload){
        const response = await galleriesService.getGallery(payload);
        state.commit('setGallery', response)
      },
      async getLoadMore(state, payload){
        console.log(payload);
        const page = payload;
        const response = await galleriesService.getAll(page);
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
        state.lastPage = payload;
     

      },
      setLoadMoreGalleries(state, payload){
        console.log(payload);
        payload.forEach(gallery => {
          state.galleries.push(gallery);
        });
        console.log(state.galleries);
      }
    },

    getters: {
      galleries: (state) => state.galleries,
      images: (state) => state.images,
      gallery: (state) => state.gallery,
      current_page: (state) => state.current_page,
      lastPage: (state) => state.lastPage,

    }

   

}
export default galleryModule;