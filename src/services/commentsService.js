import { RequestHandler } from "./RequestHandler";

class CommentsService extends RequestHandler{
    async getCommentsByGalleryId(id){
        const response = await this.apiClient.get(`/comments/${id}`);
        return response.data;
    }
    async createComment(params){
        const response = await this.apiClient.post('/comments', params);
        return response.data;
    }
    async deleteComment(id){
       const response = await this.apiClient.delete(`/comments/${id}`);
       return response.data;
    }
}

const commentsService = new CommentsService();
export default commentsService;