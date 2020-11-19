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
  </div>

</div>
</template>
<script>
export default {
   name: 'CommentsCard',
   props: {
       comment: Object,
       author: Object
   }
}
</script>
<style scoped>
.card{
    width: 600px;
}
</style>