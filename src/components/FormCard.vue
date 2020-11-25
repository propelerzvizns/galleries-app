<template>
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

            <div class="form-group col-lg-5 m-auto" v-for="(image, k) in gallery.images" :key="k">
                
                <label for="imageUrl">Picture path{{image.id}}</label>
                <div class="row  ">
                    <button class="btn btn-secondary ml-auto col-lg-1" @click="handleMoveUp(image)">
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
                    <button class="btn btn-secondary col-lg-1" @click="handleMoveDown(image)">
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
                        v-model="gallery.images[k].img_url" 
                        :class="gallery.images.length != 1 ? 'col-lg-8 form-control' : 'form-control col-lg-10'" 
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
                <button v-show="gallery.images.length != 1" class="deleteButton btn btn-danger col-lg-2" @click="handleDeleteClick(k)">Delete</button>
                </div>
                <div v-if="message.length" class="alert alert-danger col-lg-5  m-auto" role="alert">
                    <span>{{message}}</span>
                </div>
                <div v-else></div>
  
            </div>
            <div>

                <button class="btn btn-secondary anotherButton" @click="handleAddClick(gallery.images.length)">Add another URL</button>
            </div>
            <hr class="col-lg-5">
            
            <button type="submit" class="btn btn-success submitButon" @click="handleSubmit">Submit</button>
            <button type="submit" class="btn btn-danger cancelButon">Cancel</button>

          
            </form>
</template>
<script>
export default {
  name: 'FormCard' ,
  props: {
    gallery: Object,
    errors: Object,
    move: Function,
    message: ''
  },
  methods: {
    handleSubmit(){
      this.$emit('handle-submit', this.gallery);
    },
    handleAddClick(length){
        
      this.$emit('handle-click', length);
    },
    handleDeleteClick(k){
      this.$emit('handle-delete-click', k);
    },
    handleMoveUp(image){
        this.$emit('handle-move-up-click', image);
    },
    handleMoveDown(image){
        this.$emit('handle-move-down-click', image);
    },
  }
}
</script>
<style scoped>

</style>