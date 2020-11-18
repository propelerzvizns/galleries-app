import authorService from '../services/authorService';
const authorModule = {
    namespaced:true,
    state:{
      author: null,
      authorGalleries: {},
      currentPage: null,
      lastPage: null,
    },
    actions:{
      async getAuthor(state, payload){
        const response = await authorService.getAuthor(payload);
        state.commit('setAuthor', response)
      },
      async getAuthorsGalleries(state, payload){
          const response = await authorService.getAuthorsGalleries(payload);
          state.commit('setAuthorGalleries', response.data);
          state.commit('setLastPage', response.last_page);
          state.commit('setCurrentPage', response.current_page);
      },

      async getLoadMoreAuthorGalleries(state, payload){
        const response = await authorService.getAuthorsGalleries(payload);
        state.commit('setLoadMoreAuthorGalleries', response.data);
        state.commit('setCurrentPage', response.current_page);
        state.commit('setLastPage', response.last_page);
      }
    },
    mutations: {
      setAuthor(state, payload){
        state.author = payload;
      },
      setAuthorGalleries(state, payload){
          state.authorGalleries = payload;
      },
      setLoadMoreAuthorGalleries(state, payload){
        payload.forEach(gallery => {
          state.authorGalleries.push(gallery);
        });
      },
      setCurrentPage(state,payload){
        state.currentPage = payload;
      },
      setLastPage(state, payload){
        state.lastPage = payload
      }

    },
    getters: {
      author: (state) => state.author,
      authorGalleries: (state) => state.authorGalleries,
      lastPage: (state) => state.lastPage,
      currentPage: (state) => state.currentPage
    }
} 
export default authorModule;