import { RequestHandler } from "./RequestHandler";
class ImagesService extends RequestHandler{
    async getImage(id){
        const response = await this.apiClient.get(`/images/${id}`)
        return response.data;
    }

}
const imagesService = new ImagesService();
export default imagesService;

