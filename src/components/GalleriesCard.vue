<template>
<div class="col-sm-3">
        <div class="card-body">
          <h3 class="card-title">
            <router-link class="nav-link" :to="{ name: 'gallery', params: { id: gallery.id }}">{{gallery.title}}</router-link>
          </h3>
          <p class="card-text">{{gallery.description}}</p>
        </div>
        <div v-if="gallery.images.length">
          <img class="card-img-top" :src="gallery.images[0].img_url" alt="Card image cap">
        </div>
        <div v-else></div>  

        <ul class="list-group list-group-flush">
          <div v-if="gallery.user != null">
          <li  class="list-group-item">{{gallery.user.first_name}} {{gallery.user.last_name}}</li>
          </div>
          <div v-else></div>

          <li class="list-group-item">{{gallery.created_at}}</li>
          <li class="list-group-item">Vestibulum at eros</li>
        </ul>
        <div class="card-body">
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a>
        </div>

</div>

</template>
<script>
export default { 
     name: 'GalleriesCard',
     props:{
         gallery: Object,
         images: Array
         
     }
}
</script>
<style scoped>

</style>