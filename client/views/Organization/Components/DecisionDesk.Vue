<template>
<div class="tab-pane active">
    <div class="card-block">
        <!--Body-->
        <div class="row">
            <div class="col-md-12 container px-3">
                <h2 class="h2-responsive">Decision Desk</h2>
                <div class="container blue-grey lighten-5 py-2">
                    <table class="table">
                        <tr>
                            <th colspan="2">Students <span class="text-uppercase small">(0 Students)</span></th>
                            <th><span class="small">GPA</span></th>
                            <th><span class="small">Favourites</span></th>
                            <th>Viewed <span class="text-uppercase small">(0)</span></th>
                            <th>Interview Scheduled <span class="text-uppercase small">(0)</span></th>
                            <th>Accepted <span class="text-uppercase small">(0)</span></th>
                            <th>Actions <span class="text-uppercase small">(0)</span></th>
                        </tr>
                        <tr v-show="companyPreferences.length == 0">
                            <td colspan="8" class="text-center"><div class="alert alert-info mb-0">Students have not yet been allocated</div></td>
                        </tr>
                        <tr v-for="preference in companyPreferences">
                            <td>
                                <img class="img rounded-circle" :src="(preference.user.photo)? (baseUrl+'photo/user/small-' + preference.user.photo) :'/img/user.png'" alt="">
                            </td>
                            <td>
                                <div class="name">{{preference.user.name}}</div>
                            </td>

                            <td class="desc">
                                <span class="title">GPA</span>
                                <span class="content">{{student_profiles[preference.user._id].GPA}}</span>
                            </td>
                            <td class="desc">
                                <span class="title">Favourite</span>
                                <span class="content">
                                    <span v-if="student_profiles[preference.user._id].FrequentSkills.length == 0">[Not Added]</span>
                                    <span v-else class="badge badge-primary" v-for="skill in student_profiles[preference.user._id].FrequentSkills">{{skill.name}}</span>
                                </span>
                            </td>
                                
                            <td class="col-md-1 status"><span class="dot"></span></td>
                            <td class="col-md-1 status"><span class="dot"></span></td>
                            <td class="col-md-1 status"><span class="dot"></span></td>
                            <td class="col-md-2 actions">
                                <router-link :to="'/profile/student/' + student_profiles[preference.user._id]._id" class="btn btn-primary btn-sm btn-block">View</router-link>
                                <a class="btn btn-primary btn-sm btn-block" @click="addNewInterview(preference.user)">Inverview</a>
                                <a class="btn btn-primary btn-sm btn-block" @click="addNewOffer(preference.user)">Accept</a>
                            </td>
                        </tr>
                    </table>
                    <!-- <div class="container decision-student white z-depth-1 p-2 my-1 mb-1"  v-for="preference in companyPreferences">
                        <div class="row">
                            <div class="col-md-7 student-details">
                                <img class="img rounded-circle" :src="(preference.user.photo)? (baseUrl+'photo/user/small-' + preference.user.photo) :'/img/user.png'" alt="">
                                <div class="name">{{preference.user.name}}</div>
                                <div class="desc">
                                    <span class="title">GPA</span>
                                    <span class="content">{{student_profiles[preference.user._id].GPA}}</span>
                                </div>
                                <div class="desc">
                                    <span class="title">Favourite</span>
                                    <span class="content">
                                        <span v-if="student_profiles[preference.user._id].FrequentSkills.length == 0">[Not Added]</span>
                                        <span v-else class="badge badge-primary" v-for="skill in student_profiles[preference.user._id].FrequentSkills">{{skill.name}}</span>
                                    </span>
                                </div>
                                
                            </div>
                            <div class="col-md-1 status"><span class="dot"></span></div>
                            <div class="col-md-1 status"><span class="dot"></span></div>
                            <div class="col-md-1 status"><span class="dot"></span></div>
                            <div class="col-md-2 actions">
                                <router-link :to="'/profile/student/' + student_profiles[preference.user._id]._id" class="btn btn-primary btn-sm btn-block">View</router-link>
                                <a class="btn btn-primary btn-sm btn-block" @click="addNewInterview(preference.user)">Inverview</a>
                                <a class="btn btn-primary btn-sm btn-block" @click="addNewOffer(preference.user)">Accept</a>
                            </div>
                        </div>

                    </div> -->
                </div>
				<hr class="mt-2">
            </div>
            
        </div>
    </div>
</div>
</template>

<style scoped>
    .decision-header{
        line-height: 1;

        .span{
            display: block;
        }
    }
    .decision-student{

        .student-details{
            display: flex;
            align-items: center;

            *{
                display: inline-block;
            }
            img{
                border-radius: 50%;
                display: inline-block;
            }
            @media screen and (min-width: 480px) {
               img{
                    height: 60px;
                }
            }
            .name{
                font-size: large;
                flex-grow: 1;
                margin-left: 10px;
            }
            .desc{
                display: flex;
                flex-direction: column;
                width: 20%;
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
            display: flex;
            align-items: center;
            justify-content: center;
            .dot{
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: #607d8b;
                display: block;
            }
        }
    }
</style>

<script>
    import Vue from 'vue'
    import store from 'store'

    export default{
        data: () => {
            return {
                company: Vue.auth.getUser(),
                companyPreferences: [],
                student_profiles: {},
                baseUrl: Vue.rest.restBaseUrl,
            }
        },
        methods: {
            getCompanyPreferences: function(){
                let vm = this;
                let _baseURL = Vue.rest.restBaseUrl;
                
                Vue.axios.get(_baseURL + 'api/company/companyPreferences/' + this.company.email)
                .then(function(res){

                    let _company_preferences = res.data;
                    vm.companyPreferences = _company_preferences;

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
                Vue.axios.post(_baseURL + 'api/company/interview/new', _interview_data)
                .then(function(res){
                    console.log(res.data);
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
                Vue.axios.post(_baseURL + 'api/company/offer/new', _offer_data)
                .then(function(res){
                    console.log(res.data);
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

            }
        },
        mounted: function(){
            this.getCompanyPreferences();
        }
    }
</script>

