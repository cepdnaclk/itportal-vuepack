<template>
<div class="tab-pane active">
    
    <div class="card-block">
        <!--Body-->
        <div class="row">
            <div class="col-md-12 container px-3">
                <h2 class="h2-responsive">Decision Desk</h2>
                <div class="container blue-grey lighten-5 py-2">
                    <div class="row decision-header mb-1">
                        <div class="col-md-7">Students <span class="text-uppercase small">(12 Students)</span></div>
                        <div class="col-md-1">Viewed <span class="text-uppercase small">(12)</span></div>
                        <div class="col-md-1">Interview Scheduled <span class="text-uppercase small">(12)</span></div>
                        <div class="col-md-1">Accepted <span class="text-uppercase small">(12)</span></div>
                        <div class="col-md-2">Actions <span class="text-uppercase small">(12)</span></div>
                    </div>
                    <div class="container decision-student white z-depth-1 p-2 my-1 mb-1"  v-for="student in companyPreferences.user">
                        <div class="row">
                            <div class="col-md-7 student-details">
                                <img class="rounded-circle" src="/img/user.png" alt="">
                                <div class="name">{{student.name}}</div>
                                <div class="desc">
                                    <span class="title">GPA</span>
                                    <span class="content">3.4</span>
                                </div>
                                <div class="desc">
                                    <span class="title">Favourite</span>
                                    <span class="content">Javascript</span>
                                </div>
                                
                            </div>
                            <div class="col-md-1 status"><span class="dot"></span></div>
                            <div class="col-md-1 status"><span class="dot"></span></div>
                            <div class="col-md-1 status"><span class="dot"></span></div>
                            <div class="col-md-2 actions">
                                <div class="btn btn-primary btn-sm btn-block">View</div>
                                <div class="btn btn-primary btn-sm btn-block" @click="addNewInterview(student)">Inverview</div>
                                <div class="btn btn-primary btn-sm btn-block">Accept</div>
                            </div>
                        </div>

                    </div>
                </div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore aperiam aut iusto quae error tempore nisi consequuntur natus magni fugiat illum, repellat minima quibusdam aliquam dolor deserunt repudiandae quas, laboriosam.
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


            }
        },
        methods: {
            getCompanyPreferences: function(){
                let vm = this;
                let _baseURL = Vue.rest.restBaseUrl;
                
                Vue.axios.get(_baseURL + 'api/company/companyPreferences/' + this.company.email)
                .then(function(res){

                    let _company_preferences = res.data;

                    console.log('_company_preferences', _company_preferences);

                    vm.companyPreferences = _company_preferences;
                    store.dispatch('showMessage', 'Retrieved existing student preferences')

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

            }
        },
        mounted: function(){
            this.getCompanyPreferences();
        }
    }
</script>

