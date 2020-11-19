import { RequestHandler } from "./RequestHandler";

class CommentsService extends RequestHandler{
    async getCommentsByGalleryId(id){
        const response = await this.apiClient.get(`comments/${id}`);
        return response.data;
    }
}

const commentsService = new CommentsService();
export default commentsService;