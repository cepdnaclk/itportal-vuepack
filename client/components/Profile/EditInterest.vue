<template>
<div>
    <form @submit.prevent="addFormData" v-show="isEditing">
        <hr>
        <div class="row">
            <div class="col-md-6">
                <hr class="hidden-sm-up">
                <h4 class="h4-responsive my-1 my-md-0">

                    <multiselect
                      v-model="interest"
                      :options="unselectedInterests"
                      :taggable="true"
                      @tag="addNewInterest"
                      tag-placeholder="Add this as a new interest"
                      placeholder="Add your interests"
                      label="name"
                      track-by="name"
                    ></multiselect>
                </h4>
                <input v-if="new_newInterest" placeholder="Name of the interest"  v-model="interest.name">
                <textarea v-if="new_newInterest" placeholder="Description"  v-model="interest.description"></textarea>
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
import Multiselect from 'vue-multiselect'

export default{
    components: { Multiselect },
    props: {
        allInterests: {
            type: Array,
            required: true,
        },
        currentInterests: {
            type: Array,
            required: true,
        },
    },
    data: function(){

        return{
            isEditing: false,
            new_newInterest: false,
            interest: {
                name: '',
                description: '',
            },
        }
    },
     methods: {
        addNewInterest: function(_new_interest){
            this.interest.name = _new_interest;
            this.interest.description = '';
            this.new_newInterest = true;
            console.log(this.interest);
        },
        addFormData: function(){
            let vm = this;

            if(this.new_newInterest){
                if(this.interest.description == ''){
                    console.log('empty value')
                    return;
                } else {
                    Vue.rest.insertData(this.interest, 'interest', null, function(res){
                        if(res){
                            res.students.push('me');
                            vm.$emit('interest-uploaded', res);
                            vm.resetFormData();
                            vm.isEditing = false;
                            vm.addProfileToInterest(res._id);
                        }
                    });
                }
            } else {

                vm.addProfileToInterest(vm.interest._id);
                vm.$emit('interest-uploaded', vm.interest);
                vm.isEditing = false;
                return;
            }


            
        },
        toggleEditing: function(){
            this.isEditing = !this.isEditing;
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
            .catch(function(err){
                console.log(err);
            })
        },
    },
    computed: {
        unselectedInterests: function(){
            // console.log();
            return _.differenceBy(this.allInterests, this.currentInterests, '_id');
        }
    },
    watch: {
        interest: function(o){
            console.log(o);

        }
    }
}
</script>

