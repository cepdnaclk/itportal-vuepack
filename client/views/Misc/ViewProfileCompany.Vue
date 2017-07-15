<template>
<div class="container">
    <div class="content profile-cards" v-if="profile">

        <div class="card" v-if="profile">
            <div class="row container p-2">
                <div class="col-lg-3 m-auto">
                    <img class="rounded-circle m-auto large-profilePicture"
                    :src="profile.photo ? restBaseUrl + 'photo/organization/large-' + profile.photo : '/img/company.png'" alt="">
                </div>
                <div class="col-lg-4  d-flex flex-column justify-content-center">
                    <h3 class="h3-responsive my-1">{{profile.name}}</h3>
                    <p class="">{{profile.description}}</p>
                </div>
                <div class="col-lg-4 offset-lg-1 d-flex flex-column justify-content-center">
                    <h4 class="h4-responsive my-1">Contact Information</h4>
                    <label v-if="profile.phone"><i class="material-icons">call</i> {{profile.phone}}</label>
                    <label v-if="profile.address" class="mt-1"><i class="fa fa-address-card-o" aria-hidden="true"></i> {{profile.address}}</label>
                    <span v-if="profile.linkswebpage"><label><i class="fa fa-globe"></i> {{profile.linkswebpage}}</label></span>
                    <span v-if="profile.linksLinkedin"><label><i class="fa fa-linkedin-square"></i> {{profile.linksLinkedin}}</label></span>
                    <span v-if="profile.linksFacebook"><label><i class="fa fa-facebook-official" aria-hidden="true"></i> {{profile.linksFacebook}}</label></span>
                    <span v-if="profile.linksGithub"><label><i class="fa fa-github"></i> {{profile.linksGithub}}</label></span>
                </div>
            </div>
        </div>

        <div class="card p-2" v-if="reps.length>0">
            <h4>Organization Representatives {{reps.length}}</h4>
            <div class="row">
                <div class="col-sm-4 rounded" v-for="rep in reps">

                    <router-link :to="'/profile/organizationRepresentative/' + rep._id">
                        <div class="white p-2 d-flex mb-1">
                            <div class="pr-2">
                                <img class="rounded-circle" :src="rep.OrganizationRepDetails.photo ? (restBaseUrl + 'photo/user/large-' + rep.OrganizationRepDetails.photo) : '/img/user.png'" style="height: 6em; border-radius: 6em" alt="" />
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
<script>
import Vue from 'vue'

export default {
    props: ['id'],
    data: ()=>{
        return {
            profile: {},
            reps: [],
            restBaseUrl: Vue.rest.restBaseUrl,
        }
    },
    methods: {

        getData: function(){
            let vm = this;
            let _baseUrl = this.restBaseUrl;

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

                })
                .catch(function(err){console.error(err)});

            })
            .catch(function(err){console.error(err)});



        }
    },
    mounted: function(){
        this.getData();
    }
}
</script>