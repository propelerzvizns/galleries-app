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
  <div v-if="(this.$route.params.id ? authorCurrentPage !== authorLastPage : currentPage !== lastPage)" >
    <button class="btn btn-secondary" @click="handleLaod">Load more</button>
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
        authorLastPage: 'AuthorModule/lastPage',
        authorCurrentPage: 'AuthorModule/currentPage',
 
      }
    ),

  },
  
  methods:{
    ...mapActions({getLoadMore: 'GalleryModule/getLoadMore', getLoadMoreAuthorGalleries: 'AuthorModule/getLoadMoreAuthorGalleries'}),
   async handleLaod(){
      if(this.$route.params.id){
        var page = this.authorCurrentPage + 1;
        const searchTerm = this.searchTerm;
        const id = this.$route.params.id
        await this.getLoadMoreAuthorGalleries({page, searchTerm, id})
      } else {
        var page = this.currentPage + 1;
        const searchTerm = this.searchTerm;
        await this.getLoadMore({page, searchTerm})
      }

    },
  },
  
  beforeRouteEnter(from, to, next){
      store.dispatch('GalleryModule/getGalleries', {page: 1, searchTerm: ''});
      next();
      const author = JSON.parse(localStorage.getItem('user'));
      if(author){
        const id = author.id
        store.dispatch('AuthorModule/getAuthorsGalleries', {page: 1, searchTerm: '', id});
        next();
        }
  }

}
</script>
<style scoped>



</style>
