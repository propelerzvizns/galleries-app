<template>
<div v-if="gallery">
        <h1>{{gallery.title}}</h1>

  <div class="card" >
    <div v-if="gallery.images.length">

      <img class="card-img-top" :src="gallery.images[0].img_url" alt="Card image cap">
    </div>
    <div v-else>
      <h3>No picture</h3>
    </div>
    <div class="card-body">
    <h5 class="card-title">
    <router-link class="nav-link" :to="{ name: 'gallery', params: { id: gallery.id }}">{{gallery.title}}</router-link>
    </h5>
    <p class="card-text">{{gallery.description}}</p>
    </div>
    <ul class="list-group list-group-flush">

    <li class="list-group-item">
      
    <router-link class="nav-link" :to="{ name: 'author', params: { id: gallery.user.id }}">{{gallery.user.first_name}} {{gallery.user.last_name}}</router-link>
       </li>
    <li class="list-group-item">{{gallery.created_at}}</li>
    <li class="list-group-item">Vestibulum at eros</li>
    </ul>
    <div class="card-body">
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
    </div>
  </div>
</div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
   methods: {
     ...mapActions({getGallery: 'GalleryModule/getGallery'}),
      
   },
   computed:{
     ...mapGetters({gallery: 'GalleryModule/gallery'})
   },
  created(){
    this.getGallery(this.$route.params.id)
  }
}
</script>
<style scoped>

</style>