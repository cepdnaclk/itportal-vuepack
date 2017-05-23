<template>
<div>
    <form @submit.prevent="addFormData" v-show="isEditing">
        <hr>
        <div class="row">
                <div class="col-md-6">
                    <hr class="hidden-sm-up">
                    <h4 class="h4-responsive my-1 my-md-0">
                        <input type="text"
                            placeholder="Interest Title"
                            list="allInterestsList"
                            v-model="interest.name">
                        <datalist id="allInterestsList">
                            <option v-for="interest in allInterests" :value="interest.name">{{interest.name}}</option>
                        </datalist>
                    </h4>
                    <textarea placeholder="Description"  v-model="interest.description"></textarea>
                </div>
                <div class="col-md-4">
                    <div class="actions d-flex justify-content-md-end  justify-content-sm-center">
                        <button type="submit" class="btn btn-primary px-2 flex-center  with-icon"><i class="material-icons responsive">add</i> Add Interest</button>
                        <button type="reset" @click.prevent="resetFormData" class="btn btn-primary px-2 flex-center  with-icon"><i class="material-icons responsive">undo</i> Reset</button>
                    </div>
                </div>
        </div>    
    </form>

    <div class="row" @click="toggleEditing" v-if="isEditing">
        <div class="btn btn-primary with-icon flex-center full-width" ><i class="material-icons">arrow_back</i> Dismiss</div>
    </div>
    <div class="row" @click="toggleEditing" v-else>
        <div class="btn btn-primary with-icon flex-center full-width" ><i class="material-icons">add</i> Add New Interest</div>
    </div>   
</div>
</template>

<script>
import Vue from 'vue';

export default{
    props: {
        allInterests: {
            type: Array,
            required: true,
        },
    },
    data(){

        return{
            isEditing: false,
            interest: {
                name: '',
                description: '',
            },
        }
    },
     methods: {
        addFormData: function(){
            let vm = this;

            let _alreadyInInterestsList = null;

            _alreadyInInterestsList = _.find(vm.allInterests, function(o) {
                return o.name == vm.interest.name;
            });

            if(_alreadyInInterestsList){
                vm.addProfileToInterest(_alreadyInInterestsList._id);
                vm.$emit('interest-uploaded', _alreadyInInterestsList);
                    vm.isEditing = false;
                
                return;
            }

            Vue.rest.insertData(this.interest, 'interest', null, function(res){
                if(res){
                    vm.$emit('interest-uploaded', res);
                    vm.resetFormData();
                    vm.isEditing = false;
                    vm.addProfileToInterest(res._id);
                }
            });
        },
        toggleEditing: function(){
            this.isEditing = !this.isEditing;
            console.log(this.isEditing);
        },
        resetFormData: function(){
            this.interest = {
                name: '',
                description: '',
            };
        },

        addProfileToInterest(_id){
            Vue.axios.post(Vue.rest.restBaseUrl + 'api/interest/addProfile', {id: _id})
            .then(function(res){
                // location.reload();
                console.log(res)
            })
            .catch(function(res){
                console.log(res);
            })
        }
    },
    watch: {
        interest: function(o){
            console.log(o);

        }
    }
}
</script>

