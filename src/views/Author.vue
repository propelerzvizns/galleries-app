<template>
<div class="author">
    <h1>author</h1>  {{author.first_name}}
{{author.last_name}}
{{author.email}}
{{author.galleries}}
</div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    methods: {
        ...mapActions({getAuthor: 'AuthorModule/getAuthor'})
    },
    computed:{
        ...mapGetters({author: 'AuthorModule/author'})
    },
    created(){
        this.getAuthor(this.$route.params.id);
    }
}
</script>
<style scoped>

</style>