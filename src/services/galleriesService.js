import { RequestHandler } from "./RequestHandler";
class GalleriesService extends RequestHandler{
    async getAll(searchTerm){
        if(typeof searchTerm === 'undefined'){
            console.log(true);
           var searchTerm = ' '
           var nextPage = 1
        }if(typeof searchTerm === 'string'){
            var newSearchTerm = searchTerm
            console.log('search term',newSearchTerm);

        }
        if(typeof searchTerm === 'number'){

            var nextPage = searchTerm +1
            console.log('next page',nextPage);
        }
        const response = await this.apiClient.get(`/galleries?page=${nextPage}&title=${newSearchTerm}`)
        return response.data;
    }
    async getGallery(id){
        const response = await this.apiClient.get(`/galleries/${id}`);
        return response.data;
    }
}
const galleriesService = new GalleriesService();
export default galleriesService;

