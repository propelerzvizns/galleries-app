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
        <input type="text" class="form-control col-sm-2" @input="handleInput" placeholder="Search galleries">
        <button class="btn btn-primary" @click="handleLogout(event)">Logout</button>
    </nav>
  
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'



export default {
    name: 'Logged',
    computed:{
        ...mapGetters({ 
            loggedUser: 'AuthModule/loggedUser',
            currentPage: 'GalleryModule/current_page'
        })
    },
    methods: {
        ...mapActions({getLogout: 'AuthModule/getLogout',getGalleries: 'GalleryModule/getGalleries'}),
    async handleLogout(){
            await this.getLogout(localStorage.token)
                this.$router.push('/login');
        },
        async handleInput(event){
            const searchTerm = event.target.value
            const page = null
            await this.getGalleries({page, searchTerm})
        }
        
    },
}

</script>
<style scoped>
span {
    margin-right: 10px;
}
</style>