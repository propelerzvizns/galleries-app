<template>
    <div>
        <h1>Create Gallery</h1>
        <form @submit.prevent enctype="multipart/form-data">
            <div class="form-group">
                <label for="title">Title</label>
                <input v-model="gallery.title" type="text" class="form-control col-lg-5  m-auto" id="title" aria-describedby="title" placeholder="Enter title">
            </div>
            <div v-if="errors.title" class="alert alert-danger col-lg-5  m-auto" role="alert">
                <span>{{errors.title[0]}}</span>
            </div>
            <div v-else></div>

            <div class="form-group">
                <label for="description">Description</label>
                <textarea  
                            v-model="gallery.description"
                            type="text" 
                            class="form-control col-lg-5  m-auto" 
                            id="description" 
                            aria-describedby="description" 
                            placeholder="Enter description" 
                            rows="3"
                ></textarea>
            </div>

            <div class="form-group col-lg-5 m-auto" v-for="(input, k) in gallery.inputs" :key="k">
                
                <label for="imageUrl">Picture path{{input.id}}</label>
                <div class="row  ">
                    <button class="btn btn-secondary ml-auto col-lg-1" @click="handleMoveUp(input)">
                        <svg id="i-chevron-top" 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 32 32" 
                            width="14" 
                            height="15" 
                            fill="none" 
                            stroke="currentcolor" 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            stroke-width="4">
                            <path d="M30 20 L16 8 2 20" />
                        </svg>
                    </button>
                    <button class="btn btn-secondary col-lg-1" @click="handleMoveDown(input)">
                        <svg id="i-chevron-bottom" 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 32 32" 
                            width="14" 
                            height="15" 
                            fill="none" 
                            stroke="currentcolor" 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            stroke-width="4">
                            <path d="M30 12 L16 24 2 12" />
                        </svg>
                    </button>
                <input type="text" 
                        v-model="gallery.inputs[k].image_url" 
                        :class="gallery.inputs.length != 1 ? 'col-lg-8 form-control' : 'form-control col-lg-10'" 
                        id="imageUrl" 
                        aria-describedby="imageUrl" 
                        placeholder="Enter picture path"
                />
                <!-- <div v-for="(input, index) in errors.inputs">
                    {{input[index]}}
                </div> -->
                <!-- {{errors.inputs[0].image_url}} -->
                <div v-if="errors.length" class="alert alert-danger col-lg-5  m-auto" role="alert">
                    <span>nesto</span>
                </div>
                <div v-else></div>
                <button v-show="gallery.inputs.length != 1" class="btn btn-danger col-lg-2" @click="handleDeleteClick(k)">Delete</button>
                </div>
                <div v-if="message.length" class="alert alert-danger col-lg-5  m-auto" role="alert">
                    <span>{{message}}</span>
                </div>
                <div v-else></div>
  
            </div>
            <div>

                <button class="btn btn-secondary anotherButton" @click="handleAddClick()">Add another URL</button>
            </div>
            <hr class="col-lg-5">
            
            <button type="submit" class="btn btn-success submitButon" @click="handleSubmit">Submit</button>
            <button type="submit" class="btn btn-danger cancelButon">Cancel</button>

          
            </form>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    data(){
        return {
            gallery: {           
                title: '',
                description: '',
                inputs: [
                {
                    id: 0,
                        image_url: ''
                    },

                ],
            },
            counter: 1,
            move: function(input, delta){
            var index = this.gallery.inputs.indexOf(input);
            var newIndex = index + delta;
            if(newIndex < 0 || newIndex == this.gallery.inputs.length)return;
            var indexes = [index, newIndex].sort((a, b) => a - b);
            this.gallery.inputs.splice(indexes[0], 2, this.gallery.inputs[indexes[1]], this.gallery.inputs[indexes[0]]);
            },
            message: '',
            errors: {}
        }

    },
    methods: {
        ...mapActions({getCreateGallery: 'GalleryModule/getCreateGallery'}),
        handleAddClick(){
            this.gallery.inputs.push({id: this.counter++,image_url: ''})
        },
        handleDeleteClick(k){
            this.gallery.inputs.splice(k, 1);
        },
        handleMoveUp(input){
           this.move(input, -1);
        },
        handleMoveDown(input){
           this.move(input, 1);
        },
        async handleSubmit(){
            const gallery = this.gallery;
            await this.getCreateGallery(gallery).then((response) => {
                this.$router.push('/');
            }).catch((error) => {
                if(error.response.status == 422){
                    this.errors = error.response.data.errors;
                    this.message = error.response.data.message;  
                    console.log('log 422', error.response)
                }  else {
                return Promise.reject(error);
            }
            });
        }
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