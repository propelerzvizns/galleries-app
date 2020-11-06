<template>
    <div>
    <h1>register</h1>
    <form @submit.prevent>
        <div class="form-group">
            <label for="firstName">First Name</label><span class="text-danger">*</span>
            <input v-model="credentials.firstName" type="text" class="form-control col-lg-5 m-auto" id="firstName" placeholder="Enter first name">
            <div v-if="errors.firstName" class="alert alert-danger col-lg-5  m-auto" role="alert">
                <span>{{errors.firstName[0]}}</span>
            </div>
            <div v-else></div>
        </div>

        <div class="form-group">
            <label for="lastName">Last Name</label><span class="text-danger">*</span>
            <input v-model="credentials.lastName" type="text" class="form-control col-lg-5 m-auto" id="lastName" placeholder="Enter first name">
            <div v-if="errors.lastName" class="alert alert-danger col-lg-5  m-auto" role="alert">
                <span>{{errors.lastName[0]}}</span>
            </div>
            <div v-else></div>
        </div>

        <div class="form-group">
            <label for="Email">Email address</label><span class="text-danger">*</span>
            <input v-model="credentials.email" type="email" class="form-control col-lg-5 m-auto" id="Email" placeholder="Enter email">
            <div v-if="errors.email" class="alert alert-danger col-lg-5  m-auto" role="alert">
                <span>{{errors.email[0]}}</span>
            </div>
            <div v-else></div>
        </div>

        <div class="form-group">
            <label for="Password">Password</label><span class="size text-danger">*</span>
                <input v-model="credentials.password"  type="password" class="form-control col-lg-5 m-auto" id="Password" placeholder="Password must be letters and minimum one nubmer">
            <div v-if="errors.password" class="alert alert-danger col-lg-5  m-auto" role="alert">
                <span>{{errors.password[0]}}</span>
            </div>
            <div v-else></div>
        </div>

        <div class="form-group">
            <label for="cPassword">Confirm password</label><span class="text-danger">*</span>
                <input v-model="credentials.confirmPassword"  type="password" class="form-control col-lg-5 m-auto" id="cPassword" placeholder="Password">
            <div v-if="errors.confirmPassword" class="alert alert-danger col-lg-5  m-auto" role="alert"> 
       <span>{{errors.confirmPassword[0]}}</span>
            </div>
            <div v-else></div>
        </div>

        <div class="form-check">
            <input v-model="credentials.iAgree" class="form-check-input" type="checkbox" value="" id="defaultCheck1">
            <label class="form-check-label" for="defaultCheck1">
                I accept terms and conditions
            </label><span class="text-danger">*</span>
        </div>
              <div v-if="errors.iAgree" class="alert alert-danger col-lg-5  m-auto" role="alert">
            <span>Terms and conditions must be accepted</span>
            </div>
            <div v-else></div>
        <button type="submit" class="btn btn-primary" @click="handleRegister">Register</button>
        <div v-if="message" class="alert alert-danger col-lg-5  m-auto" role="alert">
        {{message}}
        </div>
        <div v-else></div> 
    </form>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    name: 'Register',
    data(){
        return {
            credentials: {
                firstName:'', 
                lastName: '', 
                email: '', 
                password: '', 
                confirmPassword: '', 
                iAgree: false
            },
            message: '',
            errors:{

            }
        }
    
    },
    methods: {
        ...mapActions({getRegister: 'AuthModule/getRegister'}),
        async handleRegister(){

           await this.getRegister(this.credentials).then(response => {
               this.$router.push('/');

           }).catch(error => {
                console.log('error', error);
               this.message = error.response.data.message;
               this.errors = error.response.data.errors
    
           })
           if(localStorage.token){
           }
        }
    }
} // end of export  
</script>
<style scoped>
span {
    margin-left: 10px;
}

</style>