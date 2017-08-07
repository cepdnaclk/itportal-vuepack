<template>
    <div class="d-flex justify-content-start align-content-center">
        <div class="card green white-text px-3 py-1 mx-0 d-inline-flex inline flex-row align-items-center tag">
            <span class="text-truncate">{{interest.name}}</span>
            <span class="custom-badge primary-custom-badge align-content-end d-flex"><i class="material-icons responsive">face</i> {{getUserCount()}}</span>
            <span v-if="isOnProfile" class="custom-badge primary-custom-badge align-content-end d-flex hoverable" @click="removeInterest"><i class="material-icons responsive">close</i></span>
        </div>
        <p class="mx-2 my-auto">{{interest.description}}</p>
    </div>
</template>
<style scoped>
    .hoverable{
        cursor: pointer !important;
    }
</style>
<script>
export default{
    
    props: {
        interest: {
            type: Object,
        },
        isOnProfile: {
            default: false
        },
    },
    methods: {
        getUserCount: function(){
            let _connections = 0;

            try{
                _connections = this.interest.students.length + this.interest.organizationRep.length;
            } catch(e){
                console.log(e)
            }
            
            return _connections;
        },
        removeInterest: function(){
            let vm = this;
            vm.$emit('interestremoved', vm.interest._id);
            // console.log(vm.interest._id)
        }
    }
}
</script>

