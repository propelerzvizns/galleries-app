import { RequestHandler } from "./RequestHandler";
class AuthorService extends RequestHandler{

    async getAuthor(id){
        const response = await this.apiClient.get(`/authors/${id}`);
        return response.data
        
    }
}

const authorService = new AuthorService();
export default authorService;