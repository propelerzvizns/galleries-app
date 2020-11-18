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

    <div v-if="gallery.images.length" >

  <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="3500"
      controls
      indicators  
      class='m-auto col-lg-6'
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->

<div v-for="image in gallery.images" :key="image.id">

        <router-link class="nav-link" :to="{ name: 'image', params: { id: image.id }} ">
      <b-carousel-slide 
        :img-src="image.img_url"
        
      >
      </b-carousel-slide>
        </router-link>
</div>

   
    </b-carousel>




</div>
    </div>
    <div v-else>
      <h3>No picture</h3>
    </div>

 
  

</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
      return {
        slide: 0,
        sliding: null
      }
    },
   methods: {
     ...mapActions({getGallery: 'GalleryModule/getGallery'}),
         onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
      
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