<template>
<div class="tab-pane active">
    <div class="card-block">
        <!--Body-->
        <div class="row">
            <div class="col-md-12 container px-3 mt-1">
                <h2 class="h2-responsive">Decision Desk</h2>
                <p>Student preferences <span class="small">({{companyPreferences.length}} student(s))</span></p>
                <div class="container blue-grey lighten-5 py-2">
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
                                
                            <td class="col-md-1 status"><span class="dot d-inline-block" :class="{'active': (local_stats[preference.user._id] && local_stats[preference.user._id].viewed)}"></span></td>
                            <td class="col-md-1 status"><span class="dot d-inline-block" :class="{'active': (local_stats[preference.user._id] && local_stats[preference.user._id].interview_scheduled)}"></span></td>
                            <td class="col-md-1 status"><span class="dot d-inline-block" :class="{'active': (local_stats[preference.user._id] && local_stats[preference.user._id].offered)}"></span></td>
                            <td class="col-md-1 status"><span class="dot d-inline-block" :class="{'active': (local_stats[preference.user._id] && local_stats[preference.user._id].accepted)}"></span></td>
                            <td class="col-md-2 actions">
                                <router-link :to="'/profile/student/' + student_profiles[preference.user._id]._id" class="btn btn-primary btn-sm btn-block" @click.native="setViewed(preference.user._id)">View</router-link>
                                <a class="btn btn-primary btn-sm btn-block" @click="addNewInterview(preference.user)">Inverview</a>
                                <a class="btn btn-primary btn-sm btn-block" @click="addNewOffer(preference.user)">Accept</a>
                            </td>
                        </tr>
                    </table>
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


    export default{
        data: () => {
            return {
                company: Vue.auth.getUser(),
                companyPreferences: [],
                student_profiles: {},
                baseUrl: Vue.rest.restBaseUrl,
                local_stats: {},
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
                    });

                })
            },
            addNewInterview: function(user){

                let vm = this;
                let _baseURL = Vue.rest.restBaseUrl;
                
                let _interview_data = {
                    companyRepEmail: vm.company.email,
                    studentId: user._id
                }

                if(!confirm('Schedule an interview for this student?')){
                    return;
                }

                Vue.axios.post(_baseURL + 'api/company/interview/new', _interview_data)
                .then(function(res){
                    
                    console.log(res.data);

                    vm.setInterviewed(user._id);
                    store.dispatch('showMessage', 'New Interview Added');
                    

                })
                .catch(function(err){console.log(err)});

            },
            addNewOffer: function(user){

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
                    vm.setAccepted(user._id);
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
            setViewed: function(_id){
                let vm = this;
                let _locals = vm.local_stats;

                if(!_locals[_id]) {
                    _locals[_id] = {};
                }
                _locals[_id].viewed = true;

                Vue.set(vm.local_stats, _locals);
                
                vm.saveLocalStats();
                console.log('[local_stats]', vm.local_stats);
            },
            setInterviewed: function(_id){
                let vm = this;
                let _locals = vm.local_stats;

                if(!_locals[_id]) {
                    _locals[_id] = {};
                }
                _locals[_id].interview_scheduled = true;

                Vue.set(vm.local_stats, _locals);
                
                vm.saveLocalStats();
                console.log('[local_stats]', vm.local_stats);
            },
            setAccepted: function(_id){
                let vm = this;
                let _locals = vm.local_stats;

                if(!_locals[_id]) {
                    _locals[_id] = {};
                }
                _locals[_id].offered = true;

                Vue.set(vm.local_stats, _locals);
                
                vm.saveLocalStats();
                console.log('[local_stats]', vm.local_stats);
            },
            saveLocalStats: function(){
                localStorage.setItem('local_company_decision_stats', JSON.stringify(this.local_stats));
            },
            getLocalStats: function(){
                let _locals = JSON.parse(localStorage.getItem('local_company_decision_stats'));
                if(_locals){
                    this.local_stats = _locals;
                } else {
                    this.local_stats = {};
                }
            },
        },
        computed: {
            totalViewed: function(){
                let _count = _.countBy(this.local_stats, function(o){return o.viewed})["true"]
                return _count | 0;
            },
            totalScheduled: function(){
                let _count = _.countBy(this.local_stats, function(o){return o.interview_scheduled})["true"]
                return _count | 0;
            },
            totalOffered: function(){
                let _count = _.countBy(this.local_stats, function(o){return o.offered})["true"]
                return _count | 0;
            },
        },
        mounted: function(){
            this.getCompanyPreferences();
            this.getLocalStats();
        }
    }
</script>

