<template>
<div class="tab-pane active">
    <div class="card-block">
        <!--Body-->
        <div class="row">
            <div class="col-md-12 container px-3 mt-1">
                <h2 class="h2-responsive">Decision Desk</h2>
                <div class="container blue-grey lighten-5 py-3">

                    <h4>Student preferences <span class="small">({{companyPreferences.length}} student(s))</span></h4>
                    <table class="table table-striped white decision-student">
                        <tr>
                            <th colspan="2">Students <span class="text-uppercase small">({{companyPreferences.length}} Student(s))</span></th>
                            <th class="text-center">GPA</th>
                            <th class="text-center">Favourites</th>
                            <th class="text-center">Viewed <span class="text-uppercase small">({{totalViewed}})</span></th>
                            <th class="text-center">Interview scheduled <span class="text-uppercase small">({{totalScheduled}})</span></th>
                            <th class="text-center">Internship offered <span class="text-uppercase small">({{totalOffered}})</span></th>
                            <th class="text-center">Student accepted <span class="text-uppercase small">({{0}})</span></th>
                            <th class="text-right">Actions</th>
                        </tr>
                        <tr v-show="companyPreferences.length == 0">
                            <td colspan="9" class="text-center"><div class="alert alert-info mb-0">Students have not yet been allocated</div></td>
                        </tr>
                        <tr v-for="preference in companyPreferences">
                            <td style="min-width: 4em; vertical-align: middle;">
                                <img class="img rounded-circle z-depth-1" :src="(preference.user.photo)? (baseUrl+'photo/user/small-' + preference.user.photo) :'/img/user.png'" style="width: 3em; min-width: 3em; height: 3em;" alt="">
                            </td>
                            <td class="name" style="vertical-align: middle; width: 60%">
                                {{preference.user.name}}
                            </td>

                            <td class="desc text-center" style="vertical-align: middle">
                                <span class="title small">GPA</span>
                                <span class="content">{{student_profiles[preference.user._id].GPA}}</span>
                            </td>
                            <td class="desc text-center" style="vertical-align: middle">
                                <span class="content">
                                    <span v-if="student_profiles[preference.user._id].FrequentSkills.length == 0">[Not Added]</span>
                                    <span v-else class="badge badge-primary" v-for="skill in student_profiles[preference.user._id].FrequentSkills">{{skill.name}}</span>
                                </span>
                            </td>
                                
                            <td class="col-md-1 status"><span class="dot d-inline-block" :class="{'active': preference.company_viewed}"></span></td>
                            <td class="col-md-1 status"><span class="dot d-inline-block" :class="{'active': preference.company_interviewed}"></span></td>
                            <td class="col-md-1 status"><span class="dot d-inline-block" :class="{'active': preference.company_accepted}"></span></td>
                            <td class="col-md-1 status"><span class="dot d-inline-block" :class="{'active': preference.student_accepted}"></span></td>
                            <td class="col-md-2 actions">
                                <router-link :to="'/profile/student/' + student_profiles[preference.user._id]._id" class="btn btn-primary btn-sm btn-block" @click.native="setViewed(preference)">View</router-link>
                                <add-interview :preference="preference" :curruser="preference.user" @setinterviewed="setInterviewed"></add-interview>
                                <a class="btn btn-warning btn-sm btn-block" @click="addNewOffer(preference)">Offer the internship</a>
                            </td>
                        </tr>
                    </table>
                    <div>
                        <view-interviews :studentphotos="student_profilePictures" :studentnames="student_names"></view-interviews>
                    </div>
                </div>
				<hr class="mt-2">
            </div>
            
        </div>
    </div>
</div>
</template>

<style scoped>
    .decision-student{

        .student-details{

            *{
                vertical-align: center;
            }
            td *{
                display: inline-block;
            }
            .name{
                font-size: large;
                margin-left: 10px;
            }
            .desc{
                vertical-align: middle;
                text-align: center;
                margin-left: 10px;

                .title{
                    font-size: small;
                }
                .content{
                    text-transform: uppercase;

                }
            }
        }

        .status{
            text-align: center;
            width: 30px;
            vertical-align: middle;

            .dot{
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: #607d8b;
                display: block;

                &.active{
                    background-color: rgb(65, 184, 131);
                }
            }
        }
    }
</style>

<script>
    import Vue from 'vue';
    import store from 'store';

    import AddInterview from './Dialogs/AddInterview';
    import ViewInterviews from './ViewInterviews';


    export default{
        components: {
            AddInterview,
            ViewInterviews
        },
        data: () => {
            return {
                company: Vue.auth.getUser(),
                companyPreferences: [],
                student_profiles: {},
                baseUrl: Vue.rest.restBaseUrl,
                local_stats: {},

                student_profilePictures: {},
                student_names: {},
            }
        },
        methods: {
            getCompanyPreferences: function(){
                let vm = this;
                let _baseURL = Vue.rest.restBaseUrl;
                store.dispatch('showLoader', 'Retrieving student preferences...');
                Vue.axios.get(_baseURL + 'api/company/companyPreferences/' + this.company.email)
                .then(function(res){

                    let _company_preferences = res.data;
                    vm.companyPreferences = _company_preferences;

                    store.dispatch('hideLoader');
                    store.dispatch('showMessage', 'Retrieved existing student preferences')

                    // generate student_profiles
                    _.forEach(_company_preferences, function(o){
                        vm.getStudentFromUserId(o.user._id)
                        vm.student_profilePictures[o.user._id] = o.user.photo;
                        vm.student_names[o.user._id] = o.user.name;
                    });

                })
            },
            addNewOffer: function(preference){

                let user = preference.user;

                let vm = this;
                let _baseURL = Vue.rest.restBaseUrl;
                
                let _offer_data = {
                    companyRepEmail: vm.company.email,
                    studentId: user._id
                }

                if(!confirm('Offer internship for this student?')){
                    return;
                }

                Vue.axios.post(_baseURL + 'api/company/offer/new', _offer_data)
                .then(function(res){
                    console.log(res.data);
                    vm.setAccepted(preference);
                    store.dispatch('showMessage', 'New Offer Sent');
                })
                .catch(function(err){console.log(err)});

            },
            getStudentFromUserId: function(user_id){

                let vm = this;
                let _baseURL = Vue.rest.restBaseUrl;
                
                Vue.axios.get(_baseURL + 'api/company/get/student/' + user_id)
                .then(function(res){
                    // console.log(res.data);
                    // vm.student_profiles[user_id] = res.data;
                    Vue.set(vm.student_profiles, user_id, res.data);
                    console.log('vm.student_profiles', vm.student_profiles);

                    // getFrequentSkills
                    _.forEach(vm.student_profiles, function(_student){
                        // console.log('_student', _student)
                        let _skills = _student.skills;
                        // console.log('_skills', _skills);
                        let _grouped =_.groupBy(_skills, function(s){
                            return s.name;
                        });
                        // console.log('_grouped', _grouped);
                        let _sorted = _.sortBy(_grouped, function(o){
                            return -o.length;
                        })

                        // console.log('_sorted', _sorted);
                        // console.log(_sorted.slice(0,3))

                        let _skillset_frequent = [];
                        if(_sorted[0]) {
                            _skillset_frequent.push(_sorted[0][0]);
                        }
                        if(_sorted[1]) {
                            _skillset_frequent.push(_sorted[1][0]);
                        }
                        if(_sorted[2]) {
                            _skillset_frequent.push(_sorted[2][0]);
                        }

                        Vue.set(_student, 'FrequentSkills', _skillset_frequent)

                    })

                    // return res.data;
                })
                .catch(function(err){console.log(err)});

            },
            setViewed: function(preference){

                let _id = preference.user._id;
                preference.company_viewed = true;

                let vm = this;
                let _locals = vm.local_stats;

                if(!_locals[_id]) {
                    _locals[_id] = {};
                }
                _locals[_id].viewed = true;

                Vue.set(vm.local_stats, _id, _locals[_id]);
                delete vm.local_stats['[object Object]'];
                
                preference.company_viewed = true;
                vm.savePreferenceStats(preference);
                console.log('[local_stats]', vm.local_stats);
            },
            setInterviewed: function(preference){

                let _id = preference.user._id;
                let vm = this;
                let _locals = vm.local_stats;

                // console.log(preference, _id)
                if(!_locals[_id]) {
                    _locals[_id] = {};
                }
                _locals[_id].interview_scheduled = true;

                Vue.set(vm.local_stats, _locals);
                delete vm.local_stats['[object Object]'];
                
                preference.company_interviewed = true;
                vm.savePreferenceStats(preference);
                console.log('[local_stats]', vm.local_stats);
            },
            setAccepted: function(preference){

                let _id = preference.user._id;
                let vm = this;
                let _locals = vm.local_stats;

                if(!_locals[_id]) {
                    _locals[_id] = {};
                }
                _locals[_id].offered = true;

                Vue.set(vm.local_stats, _locals);
                delete vm.local_stats['[object Object]'];
                
                preference.company_accepted = true;
                vm.savePreferenceStats(preference);
                console.log('[local_stats]', vm.local_stats);
            },
            savePreferenceStats: function(preference){
                localStorage.setItem('local_company_decision_stats', JSON.stringify(this.local_stats));
                console.log(preference);
                let vm = this;
                Vue.rest.updatePreferences_state(preference, function(){
                    vm.getCompanyPreferences();
                });
            },
            getLocalStats: function(){
                let _locals = JSON.parse(localStorage.getItem('local_company_decision_stats'));
                if(_locals){
                    this.local_stats = _locals;
                } else {
                    this.local_stats = {};
                }
            },
            hasAndNotUndefined: function(e){
                return !_.isNull(e) && !_.isUndefined(e);
            }
        },
        computed: {
            totalViewed: function(){

                let _count =  _.countBy(this.companyPreferences, function(o){
                    return o.company_viewed == true;
                })["true"];

                // let _count = _.countBy(this.local_stats, function(o){return o.viewed})["true"]
                return _count | 0;
            },
            totalScheduled: function(){

                let _count =  _.countBy(this.companyPreferences, function(o){
                    return o.company_interviewed == true;
                })["true"];
                // let _count = _.countBy(this.local_stats, function(o){return o.interview_scheduled})["true"]
                return _count | 0;
            },
            totalOffered: function(){

                let _count =  _.countBy(this.companyPreferences, function(o){
                    return o.company_accepted == true;
                })["true"];
                // let _count = _.countBy(this.local_stats, function(o){return o.offered})["true"]
                return _count | 0;
            },
        },
        mounted: function(){
            this.getCompanyPreferences();
            this.getLocalStats();
        }
    }
</script>

