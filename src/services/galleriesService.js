import { RequestHandler } from "./RequestHandler";
class GalleriesService extends RequestHandler{
    async getAll(page){
        const nextPage = page +1
        if(page){
            const response = await this.apiClient.get(`/galleries?page=${nextPage}`)
            return response.data;
        }
        const response = await this.apiClient.get('/galleries');
        return response.data;
    }
    async getGallery(id){
        const response = await this.apiClient.get(`/galleries/${id}`);
     
        return response.data;
    }
}
const galleriesService = new GalleriesService();
export default galleriesService;