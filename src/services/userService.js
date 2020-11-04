import axios from 'axios'
class UserService {
   errors= [];
    constructor(){
        
        this.apiClient = axios.create({
        baseURL: 'http://127.0.0.1:8000/api'
    });
    this.apiClient.interceptors.request.use(function(config){
        console.log('axios', config);
        const token = localStorage.getItem('token');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    })
}

    async login(credentials){
   
     return await this.apiClient.post('/login', credentials)
    //  .then(response => {
    //     //  console.log('response', response);
    //      const loggedUser = response.data.user;
    //      localStorage.setItem('token', response.data.token);
    //      localStorage.setItem('user', JSON.stringify(response.data.user));
    //     //  console.log('then response', response);
    //      return loggedUser;
    //  }).catch(error => {
    //      const realError = error.response.data.errors;
    //     // this.errors.push(realError);
    //     //  console.log(response);
    //     this.$state.commit('error', error);
    //     // return error;
    //  });
   

  
    }
    async getLoggedIn(){
  
        const response = await this.apiClient.get('/user');
        const loggedUser = response.data;
        return loggedUser
   

    }
}

const userService = new UserService();
export default userService;