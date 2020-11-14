<template>
    <div>
        <h1>Create Gallery</h1>
        <form @submit.prevent>
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control col-lg-5  m-auto" id="title" aria-describedby="title" placeholder="Enter title">
            </div>

            <div class="form-group">
                <label for="description">Description</label>
                <textarea  type="text" 
                            class="form-control col-lg-5  m-auto" 
                            id="description" 
                            aria-describedby="description" 
                            placeholder="Enter description" 
                            rows="3"
                ></textarea>
            </div>

            <div class="form-group col-lg-5 m-auto" v-for="(input, k) in inputs" :key="k">
                
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
                        v-model="inputs[k].image_url" 
                        :class="inputs.length != 1 ? 'col-lg-8 form-control' : 'form-control col-lg-10'" 
                        id="imageUrl" 
                        aria-describedby="imageUrl" 
                        placeholder="Enter picture path"
                />
                <!-- <div class="form-control" v-if="inputs.length != 1"> -->

                    <button v-show="inputs.length != 1" class="btn btn-danger col-lg-2" @click="handleDeleteClick(k)">Delete</button>
              
  
                </div>
      
                <div div-else>
                </div>
            </div>
            <div>

                <button class="btn btn-secondary anotherButton" @click="handleAddClick()">Add another URL</button>
            </div>
            <hr>
            <button type="submit" class="btn btn-success" @click="handleSubmit">Submit</button>
            <button type="submit" class="btn btn-warning">Cancel</button>
            </form>
    </div>
</template>
<script>
export default {
    data(){
        return {
            inputs: [
               {
                   id: 0,
                    image_url: ''
                },

            ],
            counter: 1,
            move: function(input, delta){
            var index = this.inputs.indexOf(input);
            var newIndex = index + delta;
            if(newIndex < 0 || newIndex == this.inputs.length)return;
            var indexes = [index, newIndex].sort((a, b) => a - b);
            this.inputs.splice(indexes[0], 2, this.inputs[indexes[1]], this.inputs[indexes[0]]);
            }
        }

    },
    methods: {

        handleAddClick(){
            
            this.inputs.push({id: this.counter++,image_url: ''})
            console.log(this.inputs);
        },
        handleDeleteClick(k)
        {
            // const input = this.inputs.find(input => input.id == k);
                this.inputs.splice(k, 1);
        },
        
        handleMoveUp(input){
           this.move(input, -1);
          
            // console.log(indexes);
        },
        handleMoveDown(input){
           this.move(input, 1);
          
            // console.log(indexes);
        },
        handleSubmit(){
            console.log(this.inputs);
        }
    }
}
</script>
<style scoped>
.anotherButton{
    margin-top: 10px;
}

</style>