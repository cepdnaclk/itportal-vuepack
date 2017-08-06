<template>
<div class="tab-pane active">
    
    <div class="card-block">
        <!--Body-->
        <div class="row">

            <div class="container">
                 <div class="col-md-12 alert alert-warning py-0 text-center" v-if="!user.emailConfirmed">
                    Your account has not been confirmed yet. Please check your email!
                    <a @click="resendConfirmation" class="btn btn-warning">Resend Confirmation Email</a>
                </div>
            </div>

            <div class="col-md-8 container px-3 pt-1">
                <div class="welcome d-flex justify-content-start align-items-center">
                    <img :src="user.photo ? (restbaseurl + 'photo/user/large-' + user.photo) : '/img/user.png'" class="mr-2 rounded-circle" style="border-radius: 80px; height: 100px; width: 100px;">
                    <div>
                        <h4 class="h4-responsive mb-0 font-weight-normal" style="padding-bottom: 6px">{{getGreeting()}}, {{state.user.name}}!</h4>
                        <h6 class="h6-responsive mb-0 text-uppercase small">Profile updated {{moment(this.user.updatedAt)}}.</h6>

                        <div class="profile-cards d-flex m-auto grey lighten-5 mt-1 rounded">
                            <a href="#" class="d-flex with-icon p-1" :title="stats.profile_views_count + ' users viewed your profile'"><i class="material-icons responsive with">remove_red_eye</i> {{stats.profile_views_count}} profile views </a>
                            <a href="#" class="d-flex with-icon p-1" :title="stats.company_profile_views_count + ' users viewed your company profile'"><i class="material-icons responsive with">remove_red_eye</i> {{stats.company_profile_views_count}} company profile views </a>
                        </div>
                    </div>
                </div> 
                <div class="message my-3 p-1 text-center" style="opacity: 0.5">
                    <h2 class="h2-responsive">Stories not available yet</h2>
                    <p>Please continue to update your profile</p>
                </div>
                <!-- <div class="ct-chart ct-major-twelfth"></div> -->
            </div>
            <div class="col-md-4 container">
                <div class="mb-3 p-3 blue-grey lighten-5">
                    <h4 class="h4-responsive font-weight-normal">Tasks</h4>
                    <div class="row">
                        <div class="btn btn-primary d-flex with-icon text-center mr-1 px-2" @click="resendConfirmation" v-if="stats.tasks_list_user && !stats.tasks_list_user.confirm_email">
                            <i class="material-icons responsive">lock</i><span>Confirm your email</span>
                        </div>
                        <router-link
                            tag="div"
                            :to="{name: 'Organization_dashboard_editprofile'}"
                            class="btn btn-primary d-flex with-icon darken-1 text-center mr-1 px-2"
                            v-if="stats.tasks_list_user && !stats.tasks_list_user.add_intro"
                            >
                            <i class="material-icons responsive">assignment_ind</i><span>Update intro for your profile</span>
                        </router-link>
                        <router-link
                            tag="div"
                            :to="{name: 'Organization_dashboard_editprofile'}"
                            class="btn btn-primary d-flex with-icon darken-2 text-center mr-1 px-2"
                            v-if="stats.tasks_list_user && !stats.tasks_list_user.add_phone"
                            >
                            <i class="material-icons responsive">assignment_ind</i><span>Update your contact number</span>
                        </router-link>

                        <router-link
                            tag="div"
                            :to="{name: 'Organization_dashboard_editprofile'}"
                            class="btn btn-primary d-flex with-icon darken-3 text-center mr-1 px-2"
                            v-if="stats.tasks_list_user && !stats.tasks_list_user.add_profilepic"
                            >
                            <i class="material-icons responsive">photo</i><span>Update profile picture</span>
                        </router-link>

                        <router-link
                            tag="div"
                            to='/all/students'
                            class="btn btn-primary d-flex with-icon darken-4 text-center mr-1 px-2"
                            >
                            <i class="material-icons responsive">face</i><span>View student profiles</span>
                        </router-link>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</div>
</template>


<script>
import Chartist from 'chartist'
import Vue from 'vue'
import store from 'store';
import restconfig from 'config/rest';

export default {
    data(){
        return {
            state: store.state,
            user: Vue.auth.getUser(),
            restbaseurl: restconfig.url,

            stats: {},
        }
    },
    methods: {
        resendConfirmation: function(){
            Vue.auth.resendConfirmation();
        },
        moment: function(date){
            return moment(date).calendar();
        },
        getGreeting: function(){
            let _hour = new Date().getHours();
            if(_hour > 4 && _hour <= 9) return 'Good Morning';
            if(_hour > 12 && _hour <= 4) return 'Good Afternoon';
            if(_hour > 4 && _hour <= 7) return 'Good Evening';
            return 'Good Day';
        },
        getAllData: function(){
            let vm = this;
            let _baseURL = Vue.rest.restBaseUrl;

            store.dispatch('showLoader', 'Retrieving data...');
            Vue.axios.get(_baseURL + 'api/company/summary')
            .then(function(res){

                vm.stats = res.data;
                store.dispatch('hideLoader');
                store.dispatch('showMessage', 'Acquired stats summary for user');
                
            })
            .catch(function(err){
                console.log(err)
                store.dispatch('hideLoader');
                store.dispatch('showMessage', 'Auth tokens expired, logging you out');
                setTimeout(function(){
                    Vue.auth.logout();
                }, 1000);
            });
        }

    },
    mounted: function(){
        this.getAllData();
    }
}
</script>