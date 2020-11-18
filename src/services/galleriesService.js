import { RequestHandler } from "./RequestHandler";
class GalleriesService extends RequestHandler{
    async getAll(data){
        const response = await this.apiClient.get(`/galleries?page=${data.page}&title=${data.searchTerm}`)
        return response.data;
    }
    async getGallery(id){
        const response = await this.apiClient.get(`/galleries/${id}`);
        return response.data;
    }
    async createGallery(gallery){
        const response = await this.apiClient.post('/galleries', gallery)
    }
}
const galleriesService = new GalleriesService();
export default galleriesService;

