import { RequestHandler } from "./RequestHandler";
class GalleriesService extends RequestHandler{
    async getAll(data){

        if(typeof data === 'undefined'){
            data = {
                page: 1,
                searchTerm: ''
            }
            var nextPage = data.page
            var searchTerm = data.searchTerm

        } else if(typeof data.searchTerm != 'string' || typeof data.searchTerm === 'undefined') {
            var nextPage = data.page +1
            var searchTerm = ' '
        } else{
            var nextPage = data.page +1
            console.log(nextPage);
            var searchTerm = data.searchTerm
            
        }
        
        // console.log(data.page);

        const response = await this.apiClient.get(`/galleries?page=${nextPage}&title=${searchTerm}&description=${searchTerm}`)
        return response.data;
    }
    async getGallery(id){
        const response = await this.apiClient.get(`/galleries/${id}`);
        return response.data;
    }
}
const galleriesService = new GalleriesService();
export default galleriesService;

