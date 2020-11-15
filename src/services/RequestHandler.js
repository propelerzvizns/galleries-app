import axios from 'axios'
import router from '../router'

export class RequestHandler {
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
        this.apiClient.interceptors.response.use(success => success, error =>{

            if(error.response.status === 401 && error.config.url != '/login'){
                console.log('inside interceptor error', { error });
                localStorage.removeItem("token")
                // redirect to /login
                // router.push('/login');
            }
            else {
                return Promise.reject(error);
            }
          });
    }
}

