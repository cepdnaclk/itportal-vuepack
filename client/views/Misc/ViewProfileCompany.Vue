<template>
<div class="container">
    <div class="content profile-cards" v-if="profile">

        <div class="card" v-if="profile">
            <div class="row container p-2">
                <div class="col-lg-3 m-auto">
                    <img class="rounded-circle m-auto large-profilePicture"
                    :src="profile.photo ? restBaseUrl + 'photo/organization/large-' + profile.photo : '/img/company.png'" alt="">
                </div>
                <div class="col-lg-4  d-flex flex-column justify-content-center company-desc" :class="{'notExpanded': !description_expanded}" @click="toggleExpansion">
                    <h3 class="h3-responsive my-1">{{profile.name}}</h3>
                    <p class="">{{profile.description}}</p>
                    <div class="btn btn-primary btn-sm btn-show-more-less" v-show="!description_expanded">Read More</div>
                    <div class="btn btn-primary btn-sm btn-show-more-less" v-show="description_expanded">Read Less</div>
                </div>
                <div class="col-lg-4 offset-lg-1 d-flex flex-column justify-content-center">
                    <h4 class="h4-responsive my-1">Contact Information</h4>
                    <span v-if="profile.phone" class="d-flex align-content-center mt-1"><i class="mr-1 material-icons">call</i> {{profile.phone}}</span>
                    <span v-if="profile.address" class="mt-1 d-flex align-content-center"><i class="mr-1 fa fa-address-card-o" aria-hidden="true"></i> {{profile.address}}</span>
                    <div class="flex">
                        <a class="btn btn-primary btn-rounded" target="_blank" v-if="profile.linksLinkedin" title="Linkedin" :href="preProcessURL(profile.linksLinkedin)"><i class="fa fa-linkedin"></i></a>
                        <a class="btn btn-primary btn-rounded" target="_blank" v-if="profile.linksGithub" title="Github" :href="preProcessURL(profile.linksGithub)"><i class="fa fa-github"></i></a>
                        <a class="btn btn-primary btn-rounded" target="_blank" v-if="profile.linkswebpage" title="Official Page" :href="preProcessURL(profile.linkswebpage)"><i class="fa fa-link"></i></a>
                        <a class="btn btn-primary btn-rounded" target="_blank" v-if="profile.linksFacebook" title="Facebook" :href="preProcessURL(profile.linksFacebook)"><i class="fa fa-facebook"></i></a>
                    </div>
                </div>
            </div>
        </div>

        <div class="card p-2" v-if="reps.length>0">
            <h4>Organization Representatives ({{reps.length}})</h4>
            <div class="row">
                <div class="col-sm-6 rounded" v-for="rep in reps">

                    <router-link :to="'/profile/organizationRepresentative/' + rep._id">
                        <div class="white p-2 d-flex mb-1">
                            <div class="pr-2 grow">
                                <img class="rounded-circle" :src="rep.OrganizationRepDetails.photo ? (restBaseUrl + 'photo/user/large-' + rep.OrganizationRepDetails.photo) : '/img/user.png'" style="height: 6em; width: 6em; border-radius: 6em" alt="" />
                            </div>
                            <div class="d-flex flex-column">
                                <span class="pt-1 student_name" >{{rep.OrganizationRepDetails.name}}</span>
                                <span>{{rep.OrganizationRepDetails.email}}</span>
                            </div>
                        </div>
                    </router-link>


                </div>  
            </div>
        </div>



    </div>
</div>
</template>
<style scoped>
.btn-show-more-less{
    position: absolute;
    bottom: 20px;
    cursor: pointer;
}
.company-desc .btn-show-more-less{
    opacity: 0.2;
}
.company-desc:hover .btn-show-more-less{
    opacity: 1;
    
}
.notExpanded{
    height: 200px;
    padding-bottom: 50px;
    justify-content: flex-start !important;
    overflow: hidden;
    .btn-show-more-less{
        bottom: 0px;
    }
}
</style>
<script>
import Vue from 'vue'
import store from 'store';

export default {
    props: ['id'],
    data: ()=>{
        return {
            profile: {},
            reps: [],
            restBaseUrl: Vue.rest.restBaseUrl,
           description_expanded:false,
        }
    },
    methods: {

        getData: function(){
            let vm = this;
            let _baseUrl = this.restBaseUrl;

            store.dispatch('showLoader', 'Retrieving data..');
            Vue.axios.get(_baseUrl + 'api/profile/organization/' + vm.id)
            .then(function(res){

                let _profile = res.data;
                vm.profile = _profile;
                console.log('vm.profile', vm.profile);

                let _rep_emails = _profile.organizationRepEmails;

                Vue.axios.post(_baseUrl + 'api/profile/organizationReps/organization', {'reps': _rep_emails})
                .then(function(res){

                    let _reps = res.data;
                    vm.reps = _reps;
                    console.log('vm.reps', vm.reps);    

                    store.dispatch('hideLoader');

                })
                .catch(function(err){console.error(err)});

            })
            .catch(function(err){console.error(err)});



        },
        toggleExpansion: function(){
            this.description_expanded = !this.description_expanded;
            console.log(this.description_expanded);
        },

        preProcessURL: function(url){
            if(url.indexOf('//')<0){
                return '//' + url;
            }
            return url;
        },
    },
    mounted: function(){
        this.getData();
    }
}
</script>