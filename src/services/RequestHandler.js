import axios from 'axios'
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
    }
}

