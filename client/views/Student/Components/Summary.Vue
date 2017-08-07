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

            <div class="col-md-8 container px-3 pt-1 story-feed">
                <div class="welcome d-flex justify-content-start align-items-center">
                    <img :src="user.photo ? (restbaseurl + 'photo/user/large-' + user.photo) : '/img/user.png'" class="mr-2 rounded-circle" style="border-radius: 80px; height: 100px; width: 100px;">
                    <div>
                        <h4 class="h4-responsive mb-0 font-weight-normal" style="padding-bottom: 6px">{{getGreeting()}}, {{state.user.name}}!</h4>
                        <h6 class="h6-responsive mb-0 text-uppercase small">Profile updated {{moment(this.user.updatedAt)}}.</h6>

                        <div class="profile-cards d-flex m-auto grey lighten-5 mt-1 rounded">
                            <a href="#" class="d-flex with-icon p-1" :title="'You have received ' +  stats.profile_views_count  + ' profile views'"><i class="material-icons responsive with">remove_red_eye</i> {{stats.profile_views_count}} profile views </a>

                        </div>
                    </div>
                </div> 
                <hr>
                <div class="my-2">

                    <h6 class="font-weight-normal text-uppercase small faded">Profile views over time and date last updated</h6>
                    <div class="ct-chart ct-major-twelfth"></div>
                    <div class="message my-3 p-1 text-center" style="opacity: 0.5">
                        <h2 class="h2-responsive">Stories not available yet</h2>
                        <p>Please continue to update your profile</p>
                    </div>
                    
                </div>
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
                            :to="{name: 'Student_dashboard_editprofile'}"
                            class="btn btn-primary d-flex with-icon darken-1 text-center mr-1 px-2"
                            v-if="stats.tasks_list_user && !stats.tasks_list_user.add_intro"
                            >
                            <i class="material-icons responsive">assignment_ind</i><span>Update intro for your profile</span>
                        </router-link>
                        <router-link
                            tag="div"
                            :to="{name: 'Student_dashboard_editprofile'}"
                            class="btn btn-primary d-flex with-icon darken-2 text-center mr-1 px-2"
                            v-if="stats.tasks_list_user && !stats.tasks_list_user.add_phone"
                            >
                            <i class="material-icons responsive">assignment_ind</i><span>Update your contact number</span>
                        </router-link>

                        <router-link
                            tag="div"
                            :to="{name: 'Student_dashboard_editprofile'}"
                            class="btn btn-primary d-flex with-icon darken-3 text-center mr-1 px-2"
                            v-if="stats.tasks_list_user && !stats.tasks_list_user.add_profilepic"
                            >
                            <i class="material-icons responsive">photo</i><span>Update profile picture</span>
                        </router-link>

                        <router-link
                            tag="div"
                            to='/all/organizations'
                            class="btn btn-primary d-flex with-icon darken-4 text-center mr-1 px-2"
                            >
                            <i class="material-icons responsive">business</i><span>View company profiles</span>
                        </router-link>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</div>
</template>

<style scoped>
.story-feed{
    border-right: solid thin #eee;
}
.ct-series-a .ct-area {
    fill: #ff6500 !important;
    fill-opacity: 0.4 !important;
}
.ct-series-b {
    fill: #f34;
}
    
</style>

<script>
import Chartist from 'chartist'
import Vue from 'vue'
import store from 'store';
import restconfig from 'config/rest';

export default {
    data(){
        return {
            state: this.$store.state,
            user: Vue.auth.getUser(),
            restbaseurl: restconfig.url,

            stats: {},
            doneLoadingStats: false,
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
            Vue.axios.get(_baseURL + 'api/student/summary')
            .then(function(res){

                vm.stats = res.data;
                store.dispatch('hideLoader');
                store.dispatch('showMessage', 'Acquired stats summary for user');

                vm.doneLoadingStats = true;
                
            })
            .catch(function(err){
                console.log(err)
                store.dispatch('hideLoader');
                store.dispatch('showMessage', 'Auth tokens expired, logging you out');
                setTimeout(function(){
                    Vue.auth.logout();
                }, 1000);
            });
        },
        drawViewStats: function(){

            let _view_stats = this.stats.profile_views;

            let _start_date = new Date(this.user.createdAt);
            let _end_date = new Date();

            let _labels = [];

            let _curr_date = _start_date;

            while(_curr_date <= _end_date){
                _labels.push(moment(_curr_date).format('MMM DD'));
                _curr_date = new Date(_curr_date.setDate(_curr_date.getDate() + 1));
            }
            _labels = _.keyBy(_labels, function(o){ return o; })
            _.forEach(_labels, function(o, i){ 
                _labels[i] = 0; 
            })
            console.log(_labels);

            let _records_profile_views = _.countBy(_view_stats, function(o){
                return moment(o.createdAt).format('MMM DD');
            });

            _records_profile_views = _.merge(_labels, _records_profile_views);


            let _last_updated = _.clone(_labels);

            _.forEach(_last_updated, function(value, key){
                _last_updated[key] = -100;
            })
            
            _last_updated[moment(this.user.updatedAt).format('MMM DD')] = _records_profile_views[moment(this.user.updatedAt).format('MMM DD')];
            
            console.log(_labels);
            console.log(_records_profile_views);
            console.log(_last_updated);


            var chart = new Chartist.Line('.ct-chart', {
                labels: _.map(_labels, function(value, key){ return key}),
                // Naming the series with the series object array notation
                series: [{
                    name: 'series-1',
                    data: _.map(_records_profile_views, function(value, key){ return value})
                },{
                    name: 'series-2',
                    data: _.map(_last_updated, function(value, key){ return value})
                }]
            }, {
                showPoint: false,
                showLine: false,
                showArea: true,
                fullWidth: true,
                showLabel: false,
                axisX: {
                    labelInterpolationFnc: function skipLabels(value, index) {
                        return (index % Math.ceil(_.size(_labels)/10))  === 0 ? value : null;
                    },
                    showGrid: true,
                    showLabel: true,
                    offset: 30
                },
                axisY: {
                    showGrid: false,
                    showLabel: true,
                    offset: 30
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
                        showArea: false,
                        showPoint: true
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
    },
    mounted: function(){
        this.getAllData();
    },
    watch: {
        doneLoadingStats: function(o){
            if(o) {
                this.drawViewStats();
            }
        }
    }
}
</script>