import authorService from '../services/authorService';
const authorModule = {
    namespaced:true,
    state:{
      author: null,
      authorGalleries: {},
      current_page: null
    },
    actions:{
      async getAuthor(state, payload){
        const response = await authorService.getAuthor(payload);
        state.commit('setAuthor', response)
      },
      async getAuthorsGalleries(state, payload){
          const response = await authorService.getAuthorsGalleries(payload);
          state.commit('setAuthorGalleries', response.data);
        

      },
      async getLoadMoreAuthorGalleries(state, payload){
        const response = await authorService.getAuthorsGalleries(payload);
        state.commit('setLoadMoreAuthorGalleries', response.data);
        state.commit('setCurrentPage', response.current_page);

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
        state.current_page = payload;
      },

    },
    getters: {
      author: (state) => state.author,
      authorGalleries: (state) => state.authorGalleries
    }
} 
export default authorModule;