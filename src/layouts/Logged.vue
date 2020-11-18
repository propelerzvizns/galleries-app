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
                <router-link class="nav-link" :to="{ name: 'my-galleries', params: { id: loggedUser.id }} ">My Galeries</router-link>
            </li>
        </ul>
        <span>Welcome {{ loggedUser.first_name }}</span>
        <input type="text" class="form-control col-sm-2" @input="handleInput" placeholder="Search galleries">
        <button class="btn btn-secondary logout" @click="handleLogout()">Logout</button>
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
            currentPage: 'GalleryModule/current_page',
            setLogoutUser: 'AuthModule/setLogoutUser'
        })
    },
    methods: {
        ...mapActions({getLogout: 'AuthModule/getLogout',getGalleries: 'GalleryModule/getGalleries'}),
    async handleLogout(){
            await this.getLogout(localStorage.token).then((response) =>{
                if(this.$route.fullPath != '/'){
                    this.$router.push('/');
                }
                }).catch((error) => {
                    if(error.response.status == 500){
                        console.log('logged CATCH na routu', {error})
                        localStorage.removeItem("token")
                        localStorage.removeItem("user")
                        this.setLogoutUser();
                        if(this.$route.fullPath != '/'){
                            this.$router.push('/');
                        }
          }
            })
        },
        async handleInput(event){
            console.log('event', event);
            const searchTerm = event.target.value;
            const page = 1;
            await this.getGalleries({page, searchTerm})
        }
        
    },
}

</script>
<style scoped>
span {
    margin-right: 10px;
}
.logout {
  margin-left: 5px;  
}
</style>