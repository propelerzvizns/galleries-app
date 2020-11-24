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
    async createGallery(payload){
        const response = await this.apiClient.post('/galleries', payload);   
    }
    async editGallery(payload) {
        const id = payload.galleryToEdit.id
        const response = await this.apiClient.put(`/galleries/${id}`, payload);
        return response.data.galleryToEdit;   
    }
}
const galleriesService = new GalleriesService();
export default galleriesService;

