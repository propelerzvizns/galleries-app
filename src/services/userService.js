import axios from 'axios'
class UserService {
    constructor(){
        
        this.apiClient = axios.create({
        baseURL: 'http://127.0.0.1:8000/api',
        headers: 'Access-Control-Allow-Origin: *',
        mode: 'cors'

    })

    
}

    async login(){
     const loggedUser =  await this.apiClient.post('/login');
    //  console.log(loggedUser);
    }
}

const userService = new UserService();
export default userService;