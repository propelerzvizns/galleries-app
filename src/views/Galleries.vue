<template>
  <div class="galleries">
  
    <h1>galleries</h1>

    <div class="list col-sm-12" v-if="galleries.length">
     
      <div class="card nesto" v-for="gallery in galleries" :key="gallery.id">
         {{gallery.id}}
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
          <div v-if="gallery.user != null">
          
          <li  class="list-group-item">{{gallery.user.first_name}} {{gallery.user.last_name}}</li>
          </div>
          <div v-else></div>
          
          <li class="list-group-item">{{gallery.created_at}}</li>
          <li class="list-group-item">Vestibulum at eros</li>
        </ul>
        <div class="card-body">
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a>
        </div>
      </div>
      
    </div>
    <div v-else class="alert alert-danger col-lg-5  m-auto" role="alert">
      <h3>No galleries were created</h3>
    </div>

   <div v-if="currentPage !== lastPage">
    <button class="btn btn-primary" @click="handleLaod">Load more</button>
   </div>
   <div v-else class="alert alert-danger col-lg-5  m-auto" role="alert">
     <h5>There is no more galleries to load</h5>

   </div>
  
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import store from '../store'



export default {
  name: 'Galleries',
  data(){
    return{
      loadMoreMsg:'There is no more galleries to load'
    }
  },
  computed: {
    ...mapGetters(
      {
        galleries: 'GalleryModule/galleries',
        images: 'GalleryModule/images',
        currentPage: 'GalleryModule/current_page',
        lastPage: 'GalleryModule/lastPage'
      }
    ),

  },
  
  methods:{
  
    ...mapActions({getLoadMore: 'GalleryModule/getLoadMore',}),
    handleLaod(){
      this.getLoadMore(this.currentPage)
    },
    
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
