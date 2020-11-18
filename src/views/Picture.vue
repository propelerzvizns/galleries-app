<template>
    <div>
        <img :src="imageUrl" alt="no picture">
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    computed:{
        ...mapGetters({imageUrl: 'imageUrl'})
    },
    methods:{
 ...mapActions({getImage: 'getImage'})
    },
    async created(){
        console.log(this.$route.params.id);
       await this.getImage(this.$route.params.id);
    }
}
</script>
<style scoped>
img{
    margin-top: 20px;
    height: 800px;
}
</style>