<template>
<div class="galleries">
  <h1 class="">galleries</h1>

  <div class="list " v-if="galleries.length">
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
    ...mapActions({getLoadMore: 'GalleryModule/getLoadMore', getLoadMoreAuthorGalleries: 'AuthorModule/getLoadMoreAuthorGalleries'}),
   async handleLaod(){
      var page = this.currentPage + 1;
      const searchTerm = this.searchTerm;
      if(this.$route.params.id){
        const id = this.$route.params.id
        await this.getLoadMoreAuthorGalleries({page, searchTerm, id})
      } else {
        await this.getLoadMore({page, searchTerm})
      }

    },


    
  },
  beforeRouteEnter(from, to, next){
    if(from.path == '/'){
      store.dispatch('GalleryModule/getGalleries', {page: 1, searchTerm: ''});
      next();
    } else if(from.path == '/my-galleries/2') {
      const author = JSON.parse(localStorage.getItem('user'));
      const id = author.id
      store.dispatch('AuthorModule/getAuthorsGalleries', {page: 1, searchTerm: '', id});
      next();
    }
      
  
    
  }

}
</script>
<style scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  margin-left: 125px;

}
.card{
  margin:5px 55px 5px 0;

}

</style>
