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
        console.log('servis', payload);
        const response = await this.apiClient.post('/galleries', payload);
        console.log(response);
        
    }
    async editGallery(payload) {
        console.log('servis', payload.id);
        const id = payload.id
        const response = await this.apiClient.put(`/galleries/${id}`, payload);
        console.log(response);
        
    }
}
const galleriesService = new GalleriesService();
export default galleriesService;

