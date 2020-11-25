<template>
<div v-if="gallery">
  
<div class="row">
  <div class="col-lg-1" v-if="loggedUser.id === gallery.user_id">
    <button class="btn btn-danger" @click="handleDeleteGallery()">Delete</button>
  </div>
  <div class="col-lg-1" v-else></div>
  <div class="galleryTitle col-lg-9">
      <h1>Gallery title: {{gallery.title}}</h1>
  </div>
  <div>
  <router-link class="btn btn-secondary routeStyle" :to="{ name: 'edit-gallery', params: { id: gallery.id}} ">Edit gallery</router-link>
  </div>
</div>
 
  

  <p class="nav-link"> 
    Authors name:
    <router-link  :to="{ name: 'author', params: { id: gallery.user.id }}">
      <b>{{gallery.user.first_name}} {{gallery.user.last_name}}</b>
    </router-link> 
  </p>
  <p>created at: <b>{{gallery.created_at}}</b></p>
  <p>Description: <b>{{gallery.description}}</b></p>
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
      <div v-for="image in gallery.images" :key="image.id">
        <router-link :to="{ name: 'image', params: { id: image.id }} ">
          <b-carousel-slide :img-src="image.img_url"></b-carousel-slide>
        </router-link>
      </div>
    </b-carousel>
  </div>
  <div class="comments">
    <comments-card 
      v-for="comment in commentsWithAuthor.comments" 
      :key="comment.id" 
      :comment="comment" 
      :author="commentsWithAuthor.author"
      @delete-comment="handleDeleteComment"
    />
    <div class="commentForm">
      <div v-if="isLoggedIn">
      <h3>Create comment</h3>
        <div v-if="buttonClicked == false">
          <form @submit.prevent >
            <div class="form-group">
              <textarea v-model="body" class="col-sm-12 col-lg-7" cols="70" rows="4"></textarea>
              <div v-if="errors.body && body == ''" class="alert alert-danger col-lg-5  m-auto" role="alert">
                  <span>{{errors.body[0]}}</span>
              </div>
              <div v-else></div>
            </div>
            <div class="form-group ">
              <button class="btn btn-secondary col-sm-2 col-lg-1" @click="handleCommentSubmit(gallery)">Submit</button>
            </div>
          </form>
        </div>
        <div v-else></div>
      </div>
      <div v-else></div>
    </div>
  </div>

</div>
<div v-else>
  <h3>No picture</h3>
</div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import CommentsCard from '../components/CommentsCard.vue'

export default {
  data() {
      return {
        slide: 0,
        sliding: null,
        body: '',
        buttonClicked: false,
        errors: {}
      }
  },
  components:{
    CommentsCard
  },
  methods: {
    ...mapActions({
      getGallery: 'GalleryModule/getGallery',
      getDeleteGallery: 'GalleryModule/getDeleteGallery',
      getCommentsByGalleryId: 'CommentModule/getCommentsByGalleryId',
      getCreateComment: 'CommentModule/getCreateComment',
      getDeleteComment: 'CommentModule/getDeleteComment'
    }),
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
    async handleCommentSubmit(gallery){
      const body = this.body;
      const galleryId = gallery.id; 
      const params = {body, galleryId};
   
      await this.getCreateComment(params).then(success => {
        this.buttonClicked = true;
      }).catch((error) => {
        if(error.response.status == 422)
        this.errors = error.response.data.errors;
      });
      
    },
    async handleDeleteComment(id){
      const result = confirm('Are you sure about deleting this comment');
      if(result) {
      await this.getDeleteComment(id);

      } 

    },
    async handleDeleteGallery(){
      const result = confirm('Are you sure about deleting this comment');
      if(result) {
        await this.getDeleteGallery(this.$route.params.id);
        this.$router.push('/');
      }
      
    }
      
  },
  computed:{
    ...mapGetters({
      gallery: 'GalleryModule/gallery',
      commentsWithAuthor: 'CommentModule/commentsWithAuthor',
      isLoggedIn: 'AuthModule/isLoggedIn',
      loggedUser: 'AuthModule/loggedUser'
    }),
    
  },

  async created(){
    const galleryId = this.$route.params.id
    await this.getGallery(galleryId);
    await this.getCommentsByGalleryId(galleryId)
  }

}
</script>
<style scoped>

.deleteButton{
  margin-left: 450px;
}
.comments {
  margin-top: 50px;
}
.routeStyle {

  border-radius: 0;
 
}
.galleryTitle {
  margin-left: 50px;
  margin-right: 18px;
}
</style>