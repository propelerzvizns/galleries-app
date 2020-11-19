<template >
<div class="card  m-auto">
  <div class="card-header">
    {{author.first_name + ' ' + author.last_name}}
  </div>
  <div class="card-body">
    <blockquote class="blockquote mb-0">
      <p>{{comment.body}}</p>
      <footer class="blockquote-footer">Created at <cite title="Source Title">{{comment.created_at}}</cite></footer>
    </blockquote>
    <div class="col-lg-2 ml-auto">

    <button type="submit" class="btn btn-danger" @click="handleDeleteComment">Delete</button>
    </div>
  </div>
</div>
</template>
<script>
import LoginVue from '../views/Login.vue'
export default {
    name: 'CommentsCard',
    props: {
       comment: Object,
       author: Object
    },
    methods:{
        handleDeleteComment(){
            this.$emit('delete-comment', this.comment.id);

        }
    } 
}
</script>
<style scoped>
.card{
    width: 600px;
      margin-bottom: 15px !important;
}
</style>