<template>
<div>
    
<div class="row">
    <div class="btn btn-primary with-icon flex-center full-width"><i class="material-icons">add</i> Add New Project</div>
</div>
<form @submit.prevent="addFormData">
    <div class="row">
            <div class="col-md-2">
                <img src="/img/project.png" class="img-thumbnail mx-auto align-content-center">
            </div>
            <div class="col-md-6">
                <hr class="hidden-sm-up">
                <h4 class="h4-responsive my-1 my-md-0"><input type="text" placeholder="Project Title" v-model="project.title"></h4>
                <textarea placeholder="Project Description"  v-model="project.description"></textarea>
                <input type="date"  v-model="project.dateStarted">
                <input type="date"  v-model="project.dateEnded">
                <div class="with-icon d-flex my-1 text-uppercase small"><i class="material-icons responsive">code</i> Individual Project</div>
            </div>
            <div class="col-md-4">
                <div class="actions d-flex justify-content-md-end  justify-content-sm-center">
                    <button type="submit" class="btn btn-primary px-2 flex-center  with-icon"><i class="material-icons responsive">add</i> Add Project</button>
                    <button type="reset" class="btn btn-primary px-2 flex-center  with-icon"><i class="material-icons responsive">undo</i> Reset</button>
                </div>
            </div>
    </div>    
</form>
</div>
</template>

<script>
import Vue from 'vue';
export default{
    
    data(){
        return{
            project: {
                title: '',
                description: '',
                dateStarted: null,
                dateEnded: null,
            }
        }
    },
     methods: {
        addFormData: function(){
            let vm = this;
            Vue.rest.insertData(this.project, 'project', null, function(res){
                if(res){
                    vm.user = res;
                    Vue.auth.setUser(res);
                }
            });
        },
    }
}
</script>

