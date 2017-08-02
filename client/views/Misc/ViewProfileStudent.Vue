<template>
<div class="container">
    <div class="content profile-cards" v-if="user">
        <nav id="navbar-scrollspy" class="sticky-top navbar navbar-toggleable-md navbar-light nav-secondary-itportal white lighten-5 hidden-md-down">
            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavSecondary"
            aria-controls="navbarNavSecondary" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <a class="navbar-brand" href="#" style="margin-right: 0">
                <img class="rounded-circle" :src="user.photo ? (restBaseUrl + 'photo/user/small-' + user.photo) : '/img/user.png'" style="height: 1.5em; border-radius: 1.5em" alt="" />
            </a>
            <div class="collapse navbar-collapse" id="navbarNavSecondary">
                <ul class="navbar-nav d-flex">
                    <li class="nav-item">
                        <a class="nav-link" :class="{active: activeSection==='intro'}" href="#intro">Intro</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="{active: activeSection==='academic'}" href="#academic">Academic</a>
                    </li>
                    <li class="nav-item" v-if="profile.projects.length>0">
                        <a class="nav-link" :class="{active: activeSection==='projects'}" href="#projects">Projects</a>
                    </li>
                    <li class="nav-item" v-if="profile.competitions.length>0">
                        <a class="nav-link" :class="{active: activeSection==='competitions'}" href="#competitions">Competitions</a>
                    </li>
                    <li class="nav-item" v-if="profile.awards.length>0">
                        <a class="nav-link" :class="{active: activeSection==='awards'}" href="#awards">Awards</a>
                    </li>
                    <li class="nav-item" v-if="profile.cocurriculars.length>0 || profile.extracurriculars.length>0">
                        <a class="nav-link" :class="{active: activeSection==='extras'}" href="#co-curricular">Extras</a>
                    </li>
                    <li class="nav-item" v-if="profile.interests.length>0">
                        <a class="nav-link" :class="{active: activeSection==='interests'}" href="#interests">Interests</a>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="card">
            <a id="intro" class='spy-anchor' style="top: -300px;"></a>
            <div class="card-block mobile-intro">
                <div class="row container">
                    <div class="col-lg-3 m-auto">
                        <img class="rounded-circle m-auto large-profilePicture z-depth-1"
                        :src="user.photo ? restBaseUrl + 'photo/user/large-' + user.photo : '/img/user.png'" alt="">
                    </div>
                    <div class="col-lg-4">
                        <h3 class="h3-responsive my-1 mobile-name">{{user.name}}</h3>
                        <h5 v-show="user.title" class="h5-responsive text-uppercase grey-text text-darken-2">{{user.title}}</h5>
                        <p v-show="user.tagline" class="tagline text-blue-grey text-darken-1">
                            {{user.tagline}}
                        </p>
                    </div>
                    <div class="col-lg-4 offset-lg-1 d-flex flex-column justify-content-center">
                        <h4 class="h4-responsive my-1 mb-sm-2">Contact Information</h4>
                        <p class="p-responsive d-inline-flex with-icon mobile-flex-center"><i class="material-icons">email</i>{{user.email}}</p>
                        <p class="p-responsive d-inline-flex with-icon mobile-flex-center"><i class="material-icons">call</i>{{user.phone}}</p>
                        <div class="flex">
                            <a class="btn btn-primary btn-rounded" target="_blank" v-if="user.linksLinkedin" title="Linkedin" :href="preProcessURL(user.linksLinkedin)"><i class="fa fa-linkedin"></i></a>
                            <a class="btn btn-primary btn-rounded" target="_blank" v-if="user.linksStackoverflow" title="Stackoverflow" :href="preProcessURL(user.linksStackoverflow)"><i class="fa fa-stack-overflow"></i></a>
                            <a class="btn btn-primary btn-rounded" target="_blank" v-if="user.linksGithub" title="Github" :href="preProcessURL(user.linksGithub)"><i class="fa fa-github"></i></a>
                            <a class="btn btn-primary btn-rounded" target="_blank" v-if="user.linksPortfolio" title="Portfolio" :href="preProcessURL(user.linksPortfolio)"><i class="fa fa-link"></i></a>
                            <a class="btn btn-primary btn-rounded" target="_blank" v-if="user.linksFacebook" title="Facebook" :href="preProcessURL(user.linksFacebook)"><i class="fa fa-facebook"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card" v-if="profile">
            <a id="resume" class='spy-anchor'></a>
            <div class="card-block">
                <h3 class="h3-responsive marginless">My Resume</h3>
                <hr class="my-2">
                Download my resume
                <a v-if="profile.resume" target="_blank" :href="restBaseUrl + '/api/all/student/cv/'+ (profile.resume)" class="btn btn-primary d-inline-flex align-items-center with-icon"><i class="material-icons">perm_identity</i> Download My Resume</a>
                <a class="btn btn-primary d-inline-flex align-items-center with-icon" @click="makeAPrint"><i class="material-icons">print</i> Print this page</a>

            </div>
        </div>

        <div class="card" >
            <a id="academic" class='spy-anchor'></a>
            <div class="card-block">
                <h3 class="h3-responsive marginless">Academic</h3>
                <hr class="my-2">
                <view-academics v-if="profile" :student="profile" :results="academics"></view-academics>
            </div>
        </div>

        <div class="card" v-if="profile.projects.length>0">
            <a id="projects" class='spy-anchor'></a>
            <div class="card-block">
                <h3 class="h3-responsive marginless">Projects</h3>
                <hr class="my-2">
                <view-project v-for="(project, index) in profile.projects" :project="project" :key="'project'+index"></view-project>
            </div>
        </div>

        <div class="card" v-if="profile.competitions.length>0">
            <a id="competitions" class='spy-anchor'></a>
            <div class="card-block">
                <h3 class="h3-responsive marginless">Competitions</h3>
                <hr class="my-2">
                <view-competition v-for="(competition, index) in profile.competitions" :competition="competition" :key="'competition'+index"></view-competition>
            </div>
        </div>


        <div class="card" v-if="profile.awards.length>0">
            <a id="awards" class='spy-anchor'></a>
            <div class="card-block">
                <h3 class="h3-responsive marginless">Awards</h3>
                <hr class="my-2">
                <view-award v-for="(award, index) in profile.awards" :award="award" :key="'award'+index"></view-award>
            </div>
        </div>


        <div class="card" v-if="profile.cocurriculars.length>0">
            <a id="coCurricular" class='spy-anchor'></a>
            <div class="card-block">
                <h3 class="h3-responsive marginless">Co-Curricular Activities</h3>
                <hr class="my-2">
                <view-cocurricular v-for="(cocurricular, index) in profile.cocurriculars" :cocurricular="cocurricular" :key="'cocurricular'+index"></view-cocurricular>
            </div>
        </div>


        <div class="card" v-if="profile.extracurriculars.length>0">
            <a id="extraCurricular" class='spy-anchor'></a>
            <div class="card-block">
                <h3 class="h3-responsive marginless">Extra Curricular Activities</h3>
                <hr class="my-2">
                <view-extracurricular v-for="(extracurricular, index) in profile.extracurriculars" :extracurricular="extracurricular" :key="'extracurricular'+index"></view-extracurricular>
            </div>
        </div>


        <div class="card" v-if="profile.interests.length>0">
            <a id="interests" class='spy-anchor'></a>
            <div class="card-block">
                <h3>Interests</h3>
                <hr class="my-1">
                 <view-interest v-for="(interest, index) in profile.interests" :interest="interest" :key="'interest'+index"></view-interest>
            </div>
        </div>
    </div>
    <div class="printable">
        <h5>Introduction</h5>
        <img class="rounded-circle large-profilePicture" :src="user.photo ? restBaseUrl + 'photo/user/large-' + user.photo : '/img/user.png'" alt="">
        <h3 class="h3-responsive my-1 mobile-name">{{user.name}}</h3>
        <h5 v-show="user.title" class="h5-responsive text-uppercase grey-text text-darken-2">{{user.title}}</h5>
        <p v-show="user.tagline" class="tagline text-blue-grey text-darken-1">
            {{user.tagline}}
        </p>
        <hr>

        <h5>Contact Information</h5>
        <p v-show="user.email"><i class="material-icons">email</i> {{user.email}}</p>
        <p v-show="user.phone"><i class="material-icons">call</i> {{user.phone}}</p>
        <p v-show="user.linksLinkedin"><i class="fa fa-linkedin"></i></i> {{user.linksLinkedin}}</p>
        <p v-show="user.linksStackoverflow"><i class="fa fa-stack-overflow"></i> {{user.linksStackoverflow}}</p>
        <p v-show="user.linksGithub"><i class="fa fa-github"></i></i> {{user.linksGithub}}</p>
        <p v-show="user.linksPortfolio"><i class="fa fa-link"></i></i> {{user.linksPortfolio}}</p>
        <p v-show="user.linksFacebook"><i class="fa fa-facebook"></i></i> {{user.linksFacebook}}</p>
        <hr>

        <h5>Academic Information</h5>
        <view-academics v-if="profile" :student="profile" :results="academics"></view-academics>
        <hr>

        <h5>Projects</h5>
        <view-project v-for="(project, index) in profile.projects" :project="project" :key="'project'+index"></view-project>
        <hr>

        <h5>Competitions</h5>
        <view-competition v-for="(competition, index) in profile.competitions" :competition="competition" :key="'competition'+index"></view-competition><hr>
        <hr>

        <h5>Awards</h5>
        <view-award v-for="(award, index) in profile.awards" :award="award" :key="'award'+index"></view-award>        
        <hr>

        <h5>Co-curricular</h5>
        <view-cocurricular v-for="(cocurricular, index) in profile.cocurriculars" :cocurricular="cocurricular" :key="'cocurricular'+index"></view-cocurricular>        
        <hr>

        <h5>Extra-curricular</h5>
        <view-extracurricular v-for="(extracurricular, index) in profile.extracurriculars" :extracurricular="extracurricular" :key="'extracurricular'+index"></view-extracurricular>        
        <hr>

        <h5>Interests</h5>
        <view-interest v-for="(interest, index) in profile.interests" :interest="interest" :key="'interest'+index"></view-interest>        
        <hr>


    </div>
</div>
</template>

<style>
    .btn-rounded{
        padding: 10pt;
        border-radius: 50%;
        line-height: 1.5em;
        margin-right: 3pt;
        margin-right: 0;
        height: 32pt;
        width: 32pt;
    }
</style>
<style scoped>
    @media screen and (max-width: 991px){
        .mobile-intro{
            text-align: center !important;
        }
        .mobile-name{
            font-size: 2em !important;
        }
        .mobile-flex-center{
            justify-content: center;
        }
    }
    @media only screen{
        .printable{
            display: none !important;
        }
    }
    @media only print {
        .printable{

            padding: 10pt;
            background: #fff;

        }
        .card{
            &:not(.printable){
                display: none;
            }
            .tagline{
                background: #455a64;
                padding-left: 256px;
            }
        }
    }
</style>
<script>
import Vue from 'vue'

import ViewAcademics from 'components/Profile/ViewAcademics'
import ViewProject from 'components/Profile/ViewProject'
import ViewCompetition from 'components/Profile/ViewCompetition'
import ViewAward from 'components/Profile/ViewAward'
import ViewCocurricular from 'components/Profile/ViewCocurricular'
import ViewExtracurricular from 'components/Profile/ViewExtracurricular'
import ViewInterest from 'components/Profile/ViewInterest'

export default {
    components: {
        ViewAcademics,
        ViewProject,
        ViewCompetition,
        ViewAward,
        ViewCocurricular,
        ViewExtracurricular,
        ViewInterest,

    },
    props: ['id'],
    data: ()=>{
        return {
            profile: {},
            user: null,
            academics: null,
            restBaseUrl: Vue.rest.restBaseUrl,

            activeSection: 'intro',

        }
    },
    methods: {
        getData: function(){
            let vm = this;
            let _baseUrl = vm.restBaseUrl;

            Vue.axios.get(_baseUrl + 'api/profile/student/' + vm.id)
            .then(function(res){
                let _profile = res.data;

                vm.profile = _profile.student;
                vm.user = _profile.student.StudentDetails;
                vm.academics  = _profile.academics;


                console.log('vm.profile', vm.profile);
            })
            .catch(function(err){console.error(err)});

        },
        preProcessURL: function(url){
            if(url.indexOf('//')<0){
                return '//' + url;
            }
            return url;
        },
        makeAPrint: function(){
            window.print();
        }
    },
    mounted: function(){
        this.getData();
    }
}
</script>