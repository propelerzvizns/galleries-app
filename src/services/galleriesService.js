// import  axios  from "axios";
import { RequestHandler } from "./requestHandler";
// import axios from 'axios'
class GalleriesService extends RequestHandler{
    async getAll(){
        const response = await this.apiClient.get('/galleries');
        // console.log(axios);
        // const response = await axios.get('http://127.0.0.1:8000/api/galleries');

        console.log('galleries response service', response);
        return response.data;
        
    }
}
const galleriesService = new GalleriesService();
export default galleriesService;