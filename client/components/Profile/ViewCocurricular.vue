<template>
<div v-if="visible" class="row my-3 container">
    <div class="col-md-2">
        <img src="/img/cocurricular.png" class="rounded-circle mx-auto align-content-center" style="width:100px;">
    </div>
    <div class="col-md-6 align-self-center" :class="{'col-md-10': !isOnProfile}">
        <hr class="hidden-sm-up">
        <h4 class="h4-responsive my-1 my-md-0">{{cocurricular.title}}</h4>
        <p class="my-0">{{cocurricular.description}}</p>
    </div>
    <div class="col-md-4" v-if="isOnProfile">
        <div class="actions d-flex justify-content-md-end  justify-content-sm-center">
            <button v-show="false" lass="btn btn-primary px-2"><i class="material-icons responsive">edit</i></button>
            <button class="btn btn-warning px-2" @click="deleteItem(cocurricular._id)"><i class="material-icons responsive">close</i></button>
        </div>
    </div>
</div>    
</template>

<script>
import Vue from 'vue';

export default{
    
    props: {
        cocurricular: {
            type: Object,
        },
        isOnProfile: {
            default: false
        }
    },
    data: function(){
        return {
            visible: true,
        }
    },
    methods:{
        deleteItem: function(_id){
            let vm = this;
            let _baseUrl = Vue.rest.restBaseUrl;

            Vue.axios.delete(_baseUrl + 'api/profile/cocurricular/' + _id)
            .then(function(res){
                console.log(res);
                vm.visible = false;
            })
            .catch(function(err){
                console.log(err);
            })

        }
    }
}
</script>

