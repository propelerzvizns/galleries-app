import { RequestHandler } from "./RequestHandler";
class AuthorService extends RequestHandler{

    async getAuthor(id){
        const response = await this.apiClient.get(`/authors/${id}`);
        return response.data;
    }
    async getAuthorsGalleries(data){
        const response = await this.apiClient.get(`/authorsGalleries/${data.id}?page=${data.page}&title=${data.searchTerm}`);
        return response.data;
    }
}

const authorService = new AuthorService();
export default authorService;