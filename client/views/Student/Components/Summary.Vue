<template>
<div class="tab-pane active">
    
    <div class="card-block">
        <!--Body-->
        <div class="row">
            <div class="col-md-7 container px-3">
                <div class="welcome d-flex justify-content-start align-items-center">
                    <img :src="(restbaseurl + '/photo/user/large-' + user.photo) || '/img/user.png'" class="mr-2 rounded-circle" style="border-radius: 80px; height: 80px; width: 80px;">
                    <div>
                        <h4 class="h4-responsive mb-0 font-weight-normal" style="padding-bottom: 6px">Good day, {{state.user.name}}!</h4>
                        <h6 class="h6-responsive mb-0 text-uppercase small">Last accessed 23 days ago. Profile updated 40 days ago.</h6>
                    </div>
                </div> 
                <div class="profile-cards d-flex m-auto justify-content-center grey lighten-5 mt-1 rounded">
                    <a href="#" class="d-flex with-icon p-1" title="Send Message"><i class="material-icons responsive with">remove_red_eye</i> 43 profile views </a>
                    <a href="#" class="d-flex with-icon p-1" title="Send Message"><i class="material-icons responsive with">share</i> 128 connections </a>
                </div>
                <div class="message my-5 text-center">
                    <h2 class="h2-responsive">A bit too early don't you think?</h2>
                    <p>Our students are not online yet. We'll notify you once everything is up and running
                    <br> In the meantime, keep your profile updated.</p>
                    <p>Thank you for your interest!</p>
                </div>
                <div class="ct-chart ct-major-twelfth"></div>
            </div>
            <div class="col-md-5 container">
                <div class="my-2 mb-3">
                    <div class="alert alert-warning mx-0" v-if="!user.emailConfirmed">
                        Your account has not been confirmed yet. <br>Please check your email!
                        <a @click="resendConfirmation" class="btn btn-warning">Resend Confirmation Email</a>
                    </div>
                    <h4 class="h4-responsive mb-0 font-weight-normal">Trending Tasks</h4>
                    <h6 class="h6-responsive my-1">What others are doing</h6>
                    <div class="row d-flex flex-nowrap justify-content-start">
                        <div class="btn teal text-center mr-1 px-2">
                            <h1 class="h1-responsive">
                            <i class="big material-icons responsive d-block">lock</i>
                            </h1>
                            <span>Change Your Password</span>
                        </div>
                        <div class="btn teal darken-1 text-center mr-1 px-2">
                            <h1 class="h1-responsive">
                            <i class="big material-icons responsive d-block">assignment_ind</i>
                            </h1>
                            <span>Update Profile Information</span>
                        </div>
                        <div class="btn teal darken-2 text-center mr-3 px-2">
                            <h1 class="h1-responsive">
                            <i class="big material-icons responsive d-block">photo</i>
                            </h1>
                            <span>Update Profile Picture</span>
                        </div>
                    </div>
                </div>
                <div class="my-2 mb-3">
                    <h4 class="h4-responsive font-weight-normal">Suggested Tasks</h4>
                    <h6 class="h6-responsive my-1 mb-2">Recommendations for you</h6>
                    <div class="row">
                        <div class="d-flex with-icon ml-3">
                            <i class="big material-icons">done</i>
                            <span>Update your Profile Information</span>
                        </div>
                    </div>
                </div>
                <div class="my-2 mb-3">
                    <h4 class="h4-responsive mb-0 font-weight-normal">My Timeline</h4>
                    <h6 class="h6-responsive my-1 mb-2">My activity stream</h6>
                    <div class="row">
                        <div class="d-flex with-icon ml-3">
                            <i class="big material-icons">done</i>
                            <span>Update your Profile Information</span>
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
        }
    },
    methods: {
        resendConfirmation: function(){
            Vue.auth.resendConfirmation();
        }
    },
    mounted: function(){
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