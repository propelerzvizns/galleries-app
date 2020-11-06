<template>
  <div class="Logged">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <ul class="navbar-nav mr-auto">   
            <li class="nav-item">
                <router-link class="navbar-brand " to="/">All Galleries</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/create">Create new Gallery</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/my-galleries ">My Galeries</router-link>
            </li>
        </ul>
        <span>Welcome {{ loggedUser.first_name }}</span>
        <ul class="navbar-nav ">       
            <li class="nav-item ">
                <!-- <router-link class="nav-link" to="/logout">Logout</router-link>  -->
                <button class="btn btn-primary" @click="handleLogout">Logout</button>
            </li>
        </ul>
      
    </nav>
  
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Logged',
computed:{
    ...mapGetters({ loggedUser: 'AuthModule/loggedUser' })
    
},
methods: {
    ...mapActions({getLogout: 'AuthModule/getLogout'}),
   async handleLogout(){
        // await console.log('action click',localStorage.get('token') );
        await this.getLogout(localStorage.token)
            this.$router.push('/login');


    }
    
}



}

</script>
<style scoped>
span {
    margin-right: 10px;
}
</style>