<template>
    <div>
        <h1 v-if="this.$route.params.id">Edit Gallery</h1>
        <h1 v-else>Create Gallery </h1>
        <!-- {{editGallery}} -->
        <!-- {{this.$route.params.id ?authorGalleries : galleries}} -->
        <form-card :gallery="this.$route.params.id ?editGallery : gallery"
                    :errors="errors"
                    :message="message"
                    :move="move"
                    @handle-submit="handleSubmit"
                    @handle-click="handleAddClick"
                    @handle-delete-click="handleDeleteClick"
                    @handle-move-up-click="handleMoveUp"
                    @handle-move-down-click="handleMoveDown"
        />
     
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import store from '../store'
import FormCard from '../components/FormCard'
// import FormCard from '../components/FormCard.vue';
export default {
    data(){
        return {
            gallery: {           
                title: '',
                description: '',
                images: [
                {
                    id: 0,
                        img_url: ''
                    },

                ],
                user_id: ''
            },
            counter: 1,
            move: function(image, delta){
            var index = this.gallery.images.indexOf(image);
            var newIndex = index + delta;
            if(newIndex < 0 || newIndex == this.gallery.images.length)return;
            var indexes = [index, newIndex].sort((a, b) => a - b);
            this.gallery.images.splice(indexes[0], 2, this.gallery.images[indexes[1]], this.gallery.images[indexes[0]]);
            },
            message: '',
            errors: {}
        }

    },
    components:{
        FormCard

    },
    computed: {
        ...mapGetters({loggedUser: 'AuthModule/loggedUser', editGallery: 'GalleryModule/gallery', inputsToDelete: 'GalleryModule/inputsToDelete'})
    },
    methods: {
        ...mapActions({
            getCreateGallery: 'GalleryModule/getCreateGallery', 
            getGallery: 'GalleryModule/getGallery',
            getDeleteInput: 'GalleryModule/getDeleteInput',
            getAddInput: 'GalleryModule/getAddInput',
            getEditGallery : 'GalleryModule/getEditGallery'
        }),
        handleAddClick(length){
            if(this.$route.params.id){
            this.getAddInput(length)
            } else {
            this.gallery.images.push({id: this.counter++,image_url: ''})
            }
        },
        handleDeleteClick(k){
            if(this.$route.params.id){
                const inputToDelete = this.editGallery.images[k];
                this.getDeleteInput({k, inputToDelete })
            } else {
                this.gallery.images.splice(k, 1);
            }
                
        },
        handleMoveUp(image){
           this.move(image, -1);
        },
        handleMoveDown(image){
           this.move(image, 1);
        },
        async handleSubmit(){
            const userId = this.loggedUser.id;
            this.gallery.user_id = userId;
            const gallery = this.gallery;

  
            var route = this.$route.params.id;
            var galleryToEdit = this.editGallery;
            var inputsToDelete = this.inputsToDelete
            await (route ? this.getEditGallery({galleryToEdit, inputsToDelete}) : this.getCreateGallery(gallery)).then((response) => {
                (route ? this.$router.push(`/galleries/${route}`) : this.$router.push(`/`))
            }).catch((error) => {
                if(error.response.status == 422){
                    this.errors = error.response.data.errors;
                    this.message = error.response.data.message;  
                    console.log('log 422', error.response)
                } else {
                return Promise.reject(error);
            }
            });
        }
    },
    async beforeRouteEnter(from, to, next){
        if(from.params.id){
            const galleryId = from.params.id
            await store.dispatch('GalleryModule/getGallery', galleryId);
            next();
        } 
        next();
    }
}
</script>
<style scoped>
.anotherButton{
    margin-top: 10px;
}
.submitButon{
    margin-right: 5px;
}
.cancelButon{
    margin-left: 5px;
}

</style>