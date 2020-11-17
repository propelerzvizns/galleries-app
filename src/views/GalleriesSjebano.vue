<template>
  <div class="galleries">
  
    <h1>galleries</h1>

        {{authorsGalleries}}
    <div v-if="galleries.length">
      <div class="list col-sm-12" v-if="this.$route.params.id">
   
     <!-- <author-galleries-card class="card" v-for="gallery in authorGalleries" :key="gallery.id" :gallery="gallery" :images="images"/>  -->
      </div>
      <div class="list col-sm-12" v-else>
    <!-- <galleries-card class="card" v-for="gallery in galleries" :key="gallery.id" :gallery="gallery" :images="images"/> -->
        
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
import router from '../router'

import GalleriesCard from '../components/GalleriesCard.vue'
// import AuthorGalleriesCard from '../components/AuthorGalleriesCard.vue'
import AuthorGalleriesCard from '../components/AuthorGalleriesCard'
export default {
  components: { GalleriesCard },
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
        lastPage: 'GalleryModule/lastPage',
        searchTerm: 'GalleryModule/searchTerm',
        authorGalleries: 'AuthorModule/authorGalleries'
      }
    ),

  },
  
  methods:{
    ...mapActions({getLoadMore: 'GalleryModule/getLoadMore'}),
   async handleLaod(){
      var page = this.currentPage + 1;
      const searchTerm = this.searchTerm;
     await this.getLoadMore({page, searchTerm})
    },


    
  },
    beforeCreate(){
      // console.log('working', router.app.$route.params.id);
    store.dispatch('AuthorModule/getAuthorsGalleries', router.app.$route.params.id);
    },



  beforeRouteEnter(from, to, next){
    store.dispatch('GalleryModule/getGalleries', {page: 1, searchTerm: ''});
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
