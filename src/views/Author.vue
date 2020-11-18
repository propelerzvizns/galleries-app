<template>
<div class="author">
    <h1>Authors Galleries</h1> 
 <hr>
 <h4>Author name: {{author.first_name + ' '+ author.last_name}}</h4>
 <h5>Author email: {{author.email}}</h5>
 <hr>
    <div class="list " v-if="authorGalleries.length">
          <galleries-card class="card" 
                      v-for="gallery in authorGalleries" 
                      :key="gallery.id" 
                      :gallery="gallery" 
                      :images="images"
      /></div>
          <div v-if="authorCurrentPage !== authorLastPage" >
      <button class="btn btn-secondary" @click="handleLaod">Load more</button>
    </div>
      <div v-else class="alert alert-danger col-lg-5  m-auto" role="alert">
    <h5>There is no more galleries to load</h5>
      </div>
  

</div>
</template>
<script>
import store from '../store'
import { mapActions, mapGetters } from 'vuex'
import GalleriesCard from '../components/GalleriesCard'
import router from '../router'
export default {
    components:{
        GalleriesCard
    },
    methods: {
        ...mapActions({getAuthor: 'AuthorModule/getAuthor', getLoadMoreAuthorGalleries: 'AuthorModule/getLoadMoreAuthorGalleries'}),
        async handleLaod(){
            var page = this.authorCurrentPage + 1;
            const searchTerm = this.searchTerm;
            const id = this.$route.params.id
            await this.getLoadMoreAuthorGalleries({page, searchTerm, id})
        },
    },
    computed:{
        ...mapGetters({
                author: 'AuthorModule/author',
                authorGalleries: 'AuthorModule/authorGalleries',
                authorLastPage: 'AuthorModule/lastPage',
                authorCurrentPage: 'AuthorModule/currentPage',
                images: 'GalleryModule/images',
                searchTerm: 'GalleryModule/searchTerm',
        })
    },
    beforeCreate(){
        const id = router.app.$route.params.id;
        store.dispatch('AuthorModule/getAuthor', router.app.$route.params.id)
        store.dispatch('AuthorModule/getAuthorsGalleries', {page: 1, searchTerm: '', id});
    

    }
}
</script>
<style scoped>

</style>