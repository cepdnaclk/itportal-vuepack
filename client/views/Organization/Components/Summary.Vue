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

            <div class="col-md-8 container px-3">
                <div class="welcome d-flex justify-content-start align-items-center">
                    <img :src="user.photo ? (restbaseurl + 'photo/user/large-' + user.photo) : '/img/user.png'" class="mr-2 rounded-circle" style="border-radius: 80px; height: 100px; width: 100px;">
                    <div>
                        <h4 class="h4-responsive mb-0 font-weight-normal" style="padding-bottom: 6px">{{getGreeting()}}, {{state.user.name}}!</h4>
                        <h6 class="h6-responsive mb-0 text-uppercase small">Profile updated {{moment(this.user.updatedAt)}}.</h6>

                        <div class="profile-cards d-flex m-auto grey lighten-5 mt-1 rounded">
                            <a href="#" class="d-flex with-icon p-1" title="Send Message"><i class="material-icons responsive with">remove_red_eye</i> {{stats.profile_views}} profile views </a>
                            <a href="#" class="d-flex with-icon p-1" title="Send Message"><i class="material-icons responsive with">remove_red_eye</i> {{stats.profile_views_company}} company profile views </a>
                        </div>
                    </div>
                </div> 
                <div class="message my-3 p-1">
                    <h2 class="h2-responsive">A bit too early don't you think?</h2>
                    <p>Our students are not online yet. We'll notify you once everything is up and running
                    <br> In the meantime, keep your profile updated.</p>
                    <p>Thank you for your interest!</p>
                </div>
                <!-- <div class="ct-chart ct-major-twelfth"></div> -->
            </div>
            <div class="col-md-4 container">
                <div class="my-2 mb-3">
                    <h4 class="h4-responsive mb-0 font-weight-normal">Tasks</h4>
                    <div class="row">
                        <div class="btn teal text-center mr-1 px-2">
                            <i class="material-icons responsive">lock</i><span>Change Your Password</span>
                        </div>
                        <div class="btn teal darken-1 text-center mr-1 px-2">
                            <i class="material-icons responsive">assignment_ind</i>
                            <span>Update Profile Information</span>
                        </div>
                        <div class="btn teal darken-2 text-center mr-3 px-2">
                            <i class="material-icons responsive">photo</i>
                            <span>Update Profile Picture</span>
                        </div>
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
import restconfig from 'config/rest';

export default {
    data(){
        return {
            state: this.$store.state,
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
            Vue.axios.get(_baseURL + 'api/company/summary')
            .then(function(res){

                vm.stats = res.data;
                store.dispatch('showMessage', 'Acquired stats summary for user');
                
            })
            .catch(function(err){console.log(err)});
        }

    },
    mounted: function(){


        this.getAllData();


        var chart = new Chartist.Line('.ct-chart', {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
            // Naming the series with the series object array notation
            series: [{
                name: 'series-1',
                data: [0, 2, -4, 2, 0, -2, 5, 0]
            }, {
                name: 'series-2',
                data: [0, 3, 5, 3, 1, 3, 6, 0]
            }, {
                name: 'series-3',
                data: [0, 4, 3, 1, 4, 5, 3, 0]
            }]
        }, {
                showPoint: false,
                showLine: false,
                showArea: true,
                fullWidth: true,
                showLabel: false,
                axisX: {
                    showGrid: true,
                    showLabel: true,
                    offset: 100
                },
                axisY: {
                    showGrid: false,
                    showLabel: true,
                    offset: 0
                },
                chartPadding: 0,
                low: 0,
                // Within the series options you can use the series names
                // to specify configuration that will only be used for the
                // specific series.
                series: {
                    'series-1': {
                        lineSmooth: Chartist.Interpolation.simple()
                    },
                    'series-2': {
                        lineSmooth: Chartist.Interpolation.simple(),
                        showArea: true
                    },
                    'series-3': {
                        showPoint: false
                    }
                }
            }, [
                // You can even use responsive configuration overrides to
                // customize your series configuration even further!
                ['screen and (max-width: 320px)', {
                    series: {
                        'series-1': {
                            lineSmooth: Chartist.Interpolation.none()
                        },
                        'series-2': {
                            lineSmooth: Chartist.Interpolation.none(),
                            showArea: false
                        },
                        'series-3': {
                            lineSmooth: Chartist.Interpolation.none(),
                            showPoint: true
                        }
                    }
                }]
            ]);
    }
}
</script>