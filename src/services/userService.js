import { RequestHandler } from "./RequestHandler";
class UserService extends RequestHandler{
    async login(credentials){
        // console.log(this.apiClient.post('/login', credentials));
     return await this.apiClient.post('/login', credentials)
    }
    async getLoggedIn(){
        const response = await this.apiClient.get('/user');
        const loggedUser = response.data;
        return loggedUser
    }
    async logout(){
        const response = await this.apiClient.post('/logout')
        return response;
    }
    async register(credentials){
        const response = await this.apiClient.post('/register',credentials)
         const loggedUser = response.data;
         return loggedUser;
    }
}
const userService = new UserService();
export default userService;