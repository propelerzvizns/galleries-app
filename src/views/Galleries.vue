<template>
  <div class="galleries">
  
    <h1>galleries</h1>
    prvu sliku iz liste slika, ime i prezime autora i vreme kreiranja. 
    U slučaju da nije kreirana nijedna galerija, prikazati odgovarajuću poruku
    <div class="list col-sm-12" v-if="galleries.length">
      <div class="card nesto" v-for="gallery in galleries" :key="gallery.id">
          <img class="card-img-top" src="" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">{{gallery.title}}</h5>
          <p class="card-text">{{gallery.description}}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">{{gallery.first_name}} {{gallery.last_name}}</li>
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
