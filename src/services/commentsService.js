import { RequestHandler } from "./RequestHandler";

class CommentsService extends RequestHandler{
    async getCommentsByGalleryId(id){
        const response = await this.apiClient.get(`/comments/${id}`);
        return response.data;
    }
    async createComment(params){
        console.log(params);
        const response = await this.apiClient.post('/comments', params);
        return response.data;
       console.log('creted', response.data);
    }
}

const commentsService = new CommentsService();
export default commentsService;