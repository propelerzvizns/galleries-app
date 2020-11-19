import commentsService from '../services/commentsService'
const commentModule = {
    namespaced: true,
    state:{commentsWithAuthor: {}}
    ,

    actions: {
       async  getCommentsByGalleryId(state, payload){
         const response = await commentsService.getCommentsByGalleryId(payload);
         state.commit('setCommentsWithAuthor', response);
        },
        async getCreateComment(state,payload){
            console.log(payload);
            const response = await commentsService.createComment(payload);
            state.commit('setNewComment', response);
        }
    },
    mutations: {
        setCommentsWithAuthor(state, payload){
            state.commentsWithAuthor = payload;
        },
        setNewComment(state, payload){
            console.log(state.commentsWithAuthor.comments);
            state.commentsWithAuthor.comments.push(payload)
        }
    },
    getters: {
        commentsWithAuthor: (state) => state.commentsWithAuthor
    }
}
export default commentModule;