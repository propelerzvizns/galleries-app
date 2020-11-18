<template>
<div v-if="gallery">
        <h1>Gallery title: {{gallery.title}}</h1>
    <p class="nav-link"> 
      Authors name:
      <router-link  :to="{ name: 'author', params: { id: gallery.user.id }}">
          <b>{{gallery.user.first_name}} {{gallery.user.last_name}}</b>
      </router-link> 
    </p>
    <p>created at: <b>{{gallery.created_at}}</b></p>
  <p>Description: <b>{{gallery.description}}</b></p>
<!-- Kao korisnik mogu da pristupim stranici određene galerije “/galleries/:id”. 
Prikazuje mi se naziv galerije u naslovu, ipod toga ime i prezime autor (klik na ovo vodi na “/authors/:id”) i vreme kreiranja. 
Nakon toga se prikazuje opis galerije, a posle toga su izlistane sve slike u toj galeriji preko bootstrap carousel komponente. 
Slike prikazujemo u redolsedu kako su sačuvane. Klik na odredjenu sliku otvara istu u novom tabu. -->

    <div v-if="gallery.images.length">

<!-- <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner" v-for="image in gallery.images" :key="image.id">
    <div  class="carousel-item active">
      <img class="d-block w-100" :src="image.img_url" alt="First slide">
    </div>
  </div>
</div> -->
  <!-- <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" :src="gallery.images[0].img_url" alt="First slide">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" :src="gallery.images[1].img_url" alt="Second slide">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" :src="gallery.images[2].img_url" alt="Third slide">
    </div>
  </div>
</div> -->
<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" :src="gallery.images[0].img_url" alt="First slide">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" :src="gallery.images[1].img_url" alt="Second slide">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" :src="gallery.images[2].img_url" alt="Third slide">
    </div>
  </div>

</div>

      <!-- <img class="card-img-top" :src="gallery.images[0].img_url" alt="Card image cap"> -->
    </div>
    <div v-else>
      <h3>No picture</h3>
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