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
        <router-link class="nav-link" :to="{ name: 'image', params: { id: image.id }} ">
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
      getCommentsByGalleryId: 'CommentModule/getCommentsByGalleryId',
      getCreateComment: 'CommentModule/getCreateComment',
      getDeleteMovie: 'CommentModule/getDeleteMovie'
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
      var result = confirm('Are you sure about deleting this comment');
      if(result) {
        console.log('passed');
      await this.getDeleteMovie(id);

      } 

    }
      
  },
  computed:{
    ...mapGetters({gallery: 'GalleryModule/gallery', commentsWithAuthor: 'CommentModule/commentsWithAuthor', isLoggedIn: 'AuthModule/isLoggedIn'})
  },

  async created(){
    // const author = JSON.parse(localStorage.getItem('user'));
    // const authorId = author.id;
    const galleryId = this.$route.params.id
    await this.getGallery(galleryId);
    await this.getCommentsByGalleryId(galleryId)
  }
}
</script>
<style scoped>
button{
  margin-left: 450px;
}
.comments {
  margin-bottom: 100px;
}

</style>