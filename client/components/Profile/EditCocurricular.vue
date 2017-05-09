<template>
<div>
    <form @submit.prevent="addFormData" v-show="isEditing">
        <hr>
        <div class="row">
                <div class="col-md-2">
                    <img src="/img/project.png" class="img-thumbnail mx-auto align-content-center">
                </div>
                <div class="col-md-6">
                    <hr class="hidden-sm-up">
                    <h4 class="h4-responsive my-1 my-md-0"><input type="text" placeholder="Co-Curricular Activity" v-model="cocurricular.title"></h4>
                    <textarea placeholder="Co-Curricular Description"  v-model="cocurricular.description"></textarea>
                    <input type="date"  v-model="cocurricular.dateStarted">
                    <input type="date"  v-model="cocurricular.dateEnded">
                    
                </div>
                <div class="col-md-4">
                    <div class="actions d-flex justify-content-md-end  justify-content-sm-center">
                        <button type="submit" class="btn btn-primary px-2 flex-center  with-icon"><i class="material-icons responsive">add</i> Add Co-Curricular Activity</button>
                        <button type="reset" @click.prevent="resetFormData" class="btn btn-primary px-2 flex-center  with-icon"><i class="material-icons responsive">undo</i> Reset</button>
                    </div>
                </div>
        </div>    
    </form>

    <div class="row" @click="toggleEditing" v-if="isEditing">
        <div class="btn btn-primary with-icon flex-center full-width" ><i class="material-icons">arrow_back</i> Dismiss</div>
    </div>
    <div class="row" @click="toggleEditing" v-else>
        <div class="btn btn-primary with-icon flex-center full-width" ><i class="material-icons">add</i> Add New Co-Curricular Activity</div>
    </div>   
</div>
</template>

<script>
import Vue from 'vue';

export default{
    props: {
        authorType: {
            required: true,
            default: 'student'
        },
    },
    data(){

        return{
            isEditing: false,
            cocurricular: {
                title: '',
                description: '',
                dateStarted: null,
                dateEnded: null,
                authorEmail: Vue.auth.getUser().email,
                authorType: this.authorType,
            },
        }
    },
     methods: {
        addFormData: function(){
            let vm = this;
            Vue.rest.insertData(this.cocurricular, 'cocurricular', null, function(res){
                if(res){
                    vm.$emit('cocurricular-uploaded', res);
                    vm.resetFormData();
                    vm.isEditing = false;
                }
            });
        },
        toggleEditing: function(){
            this.isEditing = !this.isEditing;
            console.log(isEditing);
            this.resetFormData();
        },
        resetFormData: function(){
            this.cocurricular = {
                title: '',
                description: '',
                dateStarted: null,
                dateEnded: null,
                authorEmail: Vue.auth.getUser().email,
                authorType: this.AuthorType,
            };
        }
    }
}
</script>

