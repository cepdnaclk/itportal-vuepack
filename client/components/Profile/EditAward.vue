<template>
<div>
    <form @submit.prevent="addFormData" v-show="isEditing">
        <hr>
        <div class="row">
                <div class="col-md-2">
                    <img src="/img/awards.png" class="rounded-circle mx-auto align-content-center" style="width:100px; height: 100px;">
                </div>
                <div class="col-md-6">
                    <hr class="hidden-sm-up">
                     <label>Title of the Award<input type="text" class="" v-model="award.title" placeholder="Title of the award"></label>
                    <label class="mt-1">Description of Award<textarea type="text" class="md-textarea" v-model="award.description" placeholder="Your description about the award"></textarea></label>

                    <div class="my-1">
                        <label class="dates">Date of award<input type="date"  v-model="award.date"></label>
                    </div>
                </div>
                <div class="col-md-4">
                    
                    <div class="actions d-block">
                        <button type="submit" class="btn btn-primary px-2 flex-center with-icon btn-block"><i class="material-icons responsive">add</i> Add Award</button>
                        <button type="reset" @click.prevent="resetFormData" class="btn btn-primary px-2 flex-center with-icon btn-block"><i class="material-icons responsive">undo</i> Reset</button>
                    </div>
                </div>
        </div>    
    </form>

    <div class="row" @click="toggleEditing" v-if="isEditing">
        <div class="btn btn-primary with-icon flex-center full-width" ><i class="material-icons">arrow_back</i> Dismiss</div>
    </div>
    <div class="row" @click="toggleEditing" v-else>
        <div class="btn btn-primary with-icon flex-center full-width" ><i class="material-icons">add</i> Add New Award</div>
    </div>   
</div>
</template>

<style scoped>
    input, textarea{
        margin: 0;
        padding-top: 0.3em;
    }
    label{
        width: 100%;
        &.dates{
            width: 48%;
        }
    }
</style>
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
            award: {
                title: '',
                description: '',
                date: null,
                authorEmail: Vue.auth.getUser().email,
                authorType: this.authorType,
            },



        }
    },
     methods: {
        addFormData: function(){
            let vm = this;
            Vue.rest.insertData(this.award, 'award', null, function(res){
                if(res){
                    vm.$emit('award-uploaded', res);
                    vm.resetFormData();
                    vm.isEditing = false;
                }
            });
        },
        toggleEditing: function(){
            this.isEditing = !this.isEditing;
            this.resetFormData();
        },
        resetFormData: function(){
            this.award = {
                title: '',
                description: '',
                dateStarted: null,
                dateEnded: null,
                authorEmail: Vue.auth.getUser().email,
                authorType: this.authorType,
            };
        }
    }
}
</script>

