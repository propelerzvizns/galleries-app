import commentsService from '../services/commentsService'
const commentModule = {
    namespaced: true,
    state:{
        commentsWithAuthor: {}
    },

    actions: {
       async  getCommentsByGalleryId(state, payload){
         const response = await commentsService.getCommentsByGalleryId(payload);
         state.commit('setCommentsWithAuthor', response);
        },
        async getCreateComment(state,payload){
            const response = await commentsService.createComment(payload);
            state.commit('setNewComment', response);
        },
        async getDeleteComment(state, payload){
            
            const response = await commentsService.deleteComment(payload);
            const responseComments = await commentsService.getCommentsByGalleryId(response.gallery_id);
            state.commit('setCommentsWithAuthor', responseComments);
        }
    },
    mutations: {
        setCommentsWithAuthor(state, payload){
            state.commentsWithAuthor = payload;
        },
        setNewComment(state, payload){
            state.commentsWithAuthor.comments.push(payload)
        }
    },
    getters: {
        commentsWithAuthor: (state) => state.commentsWithAuthor
    }
}
export default commentModule;