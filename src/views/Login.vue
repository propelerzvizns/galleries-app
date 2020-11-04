<template>
  <div class="login">
    <h1>Login</h1>
  <form @submit.prevent>
    <div class="form-group">
      <label for="exampleInputEmail">Email address</label>
      <input v-model="credentials.email" type="email" class="form-control col-lg-5 m-auto" id="exampleInputEmail" placeholder="Enter email">
    </div>
    <div class="form-group">
      <label for="exampleInputPassword">Password</label>
      <input v-model="credentials.password"  type="password" class="form-control col-lg-5 m-auto" id="exampleInputPassword" placeholder="Password">
    </div>
    <button type="submit" class="btn btn-primary" @click="handleSubmit">Login</button>
  </form>

  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex';
export default {
  data(){
    return {
      credentials: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapGetters({loggedUser: 'AuthModule/loggedUser'})
  },
  methods: {
    ...mapActions({login: 'AuthModule/login'}),

    handleSubmit(){
      console.log(this.credentials);
      this.login(this.credentials);
      this.$router.push('/');
    }
  }
}
</script>
