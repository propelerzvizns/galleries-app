import axios from 'axios'
class UserService {
   errors= [];
    constructor(){
        
        this.apiClient = axios.create({
        baseURL: 'http://127.0.0.1:8000/api'
    });
    this.apiClient.interceptors.request.use(function(config){
        
        const token = localStorage.getItem('token');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
   
        return config;
    });

}

    async login(credentials){
        
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