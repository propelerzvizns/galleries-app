<template>
  <div class="galleries">
  
    <h1>galleries</h1>
    prvu sliku iz liste slika, ime i prezime autora i vreme kreiranja. 
    U slučaju da nije kreirana nijedna galerija, prikazati odgovarajuću poruku
    <div v-if="galleries.length">
      {{galleries}}
    </div>
    <div v-else>
      <h3>No galleries were created</h3>
    </div>
    <button>click</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { mapActions } from 'vuex'
import store from '../store'
// @ is an alias to /src


export default {
  name: 'Galleries',
  data(){
    return{
      // galleries: {}
    }
  },
  computed: {
    ...mapGetters({galleries: 'GalleryModule/galleries'})
  },
  // methods:{
  //   ...mapActions({getGalleries: 'GalleryModule/getGalleries'}),
  //   clicko(){
  //     this.getGalleries();
  //   }
  // },
  beforeRouteEnter(from, to, next){
    store.dispatch('GalleryModule/getGalleries')
    next();
  }

}
</script>
