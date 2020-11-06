// import  axios  from "axios";
import { RequestHandler } from "./RequestHandler";
// import axios from 'axios'
class GalleriesService extends RequestHandler{
    async getAll(){
        const response = await this.apiClient.get('/galleries');
        return response.data;
        
    }
    async getGallery(id){
        console.log('single movie service');
        
        const response = await this.apiClient.get(`/galleries/${id}`);
        return response.data;
    }
}
const galleriesService = new GalleriesService();
export default galleriesService;