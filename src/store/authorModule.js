import authorService from '../services/authorService';
const authorModule = {
    namespaced:true,
    state:{
      author: null,
      authorGalleries: {}
    },
    actions:{
      async getAuthor(state, payload){
        const response = await authorService.getAuthor(payload);
        
        state.commit('setAuthor', response)

      },
      async getAuthorsGalleries(state, payload){
        // const author = JSON.parse(payload);
          const response = await authorService.getAuthorsGalleries(payload);
          state.commit('setAuthorGalleries', response);
        

      }
    },
    mutations: {
      setAuthor(state, payload){
        state.author = payload;
      },
      setAuthorGalleries(state, payload){
          state.authorGalleries = payload;
      }
    },
    getters: {
      author: (state) => state.author,
      authorGalleries: (state) => state.authorGalleries
    }
} 
export default authorModule;