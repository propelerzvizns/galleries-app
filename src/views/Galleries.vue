<template>
<div class="galleries">
  <h1>galleries</h1>

  <div class="list" v-if="galleries.length">
      <galleries-card class="card" 
                      v-for="gallery in (this.$route.params.id ?authorGalleries : galleries)" 
                      :key="gallery.id" 
                      :gallery="gallery" 
                      :images="images"
      />
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
import GalleriesCard from '../components/GalleriesCard'
export default {
  name: 'Galleries',
  data(){
    return{
      loadMoreMsg:'There is no more galleries to load'
    }
  },
  components: {
    GalleriesCard
  },
  computed: {
    ...mapGetters(
      {
        galleries: 'GalleryModule/galleries',
        images: 'GalleryModule/images',
        currentPage: 'GalleryModule/current_page',
        lastPage: 'GalleryModule/lastPage',
        searchTerm: 'GalleryModule/searchTerm',
        loggedUser: 'AuthModule/loggedUser',
        authorGalleries: 'AuthorModule/authorGalleries',
 
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
  beforeRouteEnter(from, to, next){
    store.dispatch('GalleryModule/getGalleries', {page: 1, searchTerm: ''});
    if(localStorage.getItem('user')){
      const author = JSON.parse(localStorage.getItem('user'));
      store.dispatch('AuthorModule/getAuthorsGalleries', author.id);
    }
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
