<template>
  <div class="galleries">
  
    <h1>galleries</h1>

    <div class="list col-sm-12" v-if="galleries.length">
      <div class="card nesto" v-for="gallery in galleries" :key="gallery.id">
        <div v-if="gallery.images.length">

          <img class="card-img-top" :src="gallery.images[0].img_url" alt="Card image cap">
        </div>
        <div v-else></div>       
                
        <div class="card-body">
          <h5 class="card-title">
            <router-link class="nav-link" :to="{ name: 'gallery', params: { id: gallery.id }}">{{gallery.title}}</router-link>
          </h5>
          <p class="card-text">{{gallery.description}}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">{{gallery.user.first_name}} {{gallery.user.last_name}}</li>
          <li class="list-group-item">{{gallery.created_at}}</li>
          <li class="list-group-item">Vestibulum at eros</li>
        </ul>
        <div class="card-body">
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a>
        </div>
      </div>
      
    </div>
    <div v-else>
      <h3>No galleries were created</h3>
    </div>
    <button>click</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import store from '../store'



export default {
  name: 'Galleries',
  data(){
    return{
   
    }
  },
  computed: {
    ...mapGetters({galleries: 'GalleryModule/galleries', images: 'GalleryModule/images'}),

  },

  beforeRouteEnter(from, to, next){
    store.dispatch('GalleryModule/getGalleries')
    next();
  }

}
</script>
<style scoped>
.list {
  display: flex;
  flex-wrap: wrap;

}
.card{
  margin:5px 5px 5px 0;
 width: 355px;
}

</style>
