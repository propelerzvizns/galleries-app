<template>
  <div class="login">
    <h1>Login</h1>
  <form @submit.prevent>
    <div class="form-group">
      <label for="exampleInputEmail">Email address</label>
      <input v-model="credentials.email" type="email" class="form-control col-lg-5 m-auto" id="exampleInputEmail" placeholder="Enter email">
      <div v-if="errors.email" class="alert alert-danger col-lg-5  m-auto" role="alert">
        <span>{{errors.email[0]}}</span>
      </div>
      <div v-else></div>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword">Password</label>
      <input v-model="credentials.password"  type="password" class="form-control col-lg-5 m-auto" id="exampleInputPassword" placeholder="Password">
      <div v-if="errors.password" class="alert alert-danger col-lg-5  m-auto" role="alert">
        <span>{{errors.password[0]}}</span>
      </div>
      <div v-else></div>
    </div>
    <button type="submit" class="btn btn-primary" @click="handleSubmit">Login</button>
    <div v-if="message" class="alert alert-danger col-lg-5  m-auto" role="alert">
      {{message}}
    </div>
    <div v-else></div> 
  </form>

  </div>
</template>
<script>
import axios from 'axios'
import  store from '../store/index'
import {mapActions, mapGetters} from 'vuex';
import userService from '../services/userService';
export default {
  data(){
    return {
      credentials: {
        email: '',
        password: ''
      },
      errors: {
     
      },
      message: ''

    }
  },
  computed: {
    ...mapGetters({loggedUser: 'AuthModule/loggedUser'})
  },
  methods: {
    ...mapActions({login: 'AuthModule/login'}),

    async handleSubmit(){
        this.errors = {};
        await  userService.apiClient.interceptors.response.use(success => success, error =>{

          if(error.response.status === 401){
            // console.log('error', localStorage);
            this.message = error.response.data.error;
            return localStorage.removeItem("token")
            this.$router.push('/login');

          }
          else if(error.response.status == 422) {
            this.errors = error.response.data.errors;
          }
        });
        this.login(this.credentials).then((response) => {
        this.$router.push('/');
        }).catch((error) => {

          if(error.response.status == 401){
            this.message = error.response.data.error;        
          } else if(error.response.status == 422) {
            this.errors = error.response.data.errors;
          }

       });

    }
  },
 
}
</script>
