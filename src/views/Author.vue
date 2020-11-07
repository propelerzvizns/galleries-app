<template>
<div class="author">
    <h1>author</h1> 
    <div v-if="author">
    {{author.first_name}}
{{author.last_name}}
{{author.email}}
{{author.galleries}}
        </div>
        <div v-else>
            <p>there is no information about this author</p></div> 
</div>
</template>
<script>
import store from '../store'
import { mapActions, mapGetters } from 'vuex'
import router from '../router'
export default {
    methods: {
        ...mapActions({getAuthor: 'AuthorModule/getAuthor'})
    },
    computed:{
        ...mapGetters({author: 'AuthorModule/author'})
    },
    beforeCreate(){
        // this.getAuthor(this.$route.params.id);
        console.log(router.app.$route.params.id);
        
        // next();
        store.dispatch('AuthorModule/getAuthor', router.app.$route.params.id)
    }
}
</script>
<style scoped>

</style>