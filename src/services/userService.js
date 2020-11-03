import axios from 'axios'
class UserService {
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
    })
}

    async login(credentials){
     const response =  await this.apiClient.post('/login', credentials);
     const loggedUser = response.data.user;
     localStorage.setItem('token', response.data.token);
     localStorage.setItem('user', JSON.stringify(response.data.user));
     return loggedUser;
    }
    async getLoggedIn(){
        // console.log('service', token)
        const response = await this.apiClient.get('/user');
        const loggedUser = response.data;
        return loggedUser
        console.log('service', loggedUser)

    }
}

const userService = new UserService();
export default userService;