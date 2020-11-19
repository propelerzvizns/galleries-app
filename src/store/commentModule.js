import commentsService from '../services/commentsService'
const commentModule = {
    namespaced: true,
    state:{commentsWithAuthor: {}}
    ,

    actions: {
       async  getCommentsByGalleryId(state, payload){
         const response = await commentsService.getCommentsByGalleryId(payload);
         state.commit('setCommentsWithAuthor', response);
        }
    },
    mutations: {
        setCommentsWithAuthor(state, payload){
            state.commentsWithAuthor = payload;
        }
    },
    getters: {
        commentsWithAuthor: (state) => state.commentsWithAuthor
    }
}
export default commentModule;