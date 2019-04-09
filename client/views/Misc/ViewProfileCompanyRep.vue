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
                        <a class="nav-link" :class="{active: activeSection==='company'}" href="#company">Company</a>
                    </li>
                    <li class="nav-item" v-if="profile.projects.length>0">
                        <a class="nav-link" :class="{active: activeSection==='projects'}" href="#projects">Projects</a>
                    </li>
                    <li class="nav-item" v-if="profile.awards.length>0">
                        <a class="nav-link" :class="{active: activeSection==='awards'}" href="#awards">Awards</a>
                    </li>
                    <li class="nav-item" v-if="profile.interests.length>0">
                        <a class="nav-link" :class="{active: activeSection==='interests'}" href="#interests">Interests</a>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="card">
            <a id="intro" class='spy-anchor' style="top: -300px;"></a>
            <div class="card-block">
                <div class="row container">
                    <div class="col-lg-3 m-auto">
                        <img class="rounded-circle m-auto large-profilePicture"
                        :src="user.photo ? restBaseUrl + 'photo/user/large-' + user.photo : '/img/user.png'" alt="">
                    </div>
                    <div class="col-lg-4 my-auto">
                        <h3 class="h3-responsive my-1">{{user.name}}</h3>
                        <h5 v-show="user.title" class="h5-responsive text-uppercase grey-text text-darken-2">{{user.title}}</h5>
                        <p v-show="user.tagline" class="tagline text-blue-grey text-darken-1">
                            {{user.tagline}}
                        </p>
                    </div>
                    <div class="col-lg-4 offset-lg-1 d-flex flex-column justify-content-center">
                        <h4 class="h4-responsive my-1" v-if="profile.phone || profile.address || user.linksLinkedin || user.linksStackoverflow || user.linksGithub || user.linksPortfolio || user.linksFacebook">Contact Information</h4>
                        <p v-if="user.email" class="p-responsive d-flex with-icon"><i class="material-icons">email</i>{{user.email}}</p>
                        <p v-if="user.phone" class="p-responsive d-flex with-icon"><i class="material-icons">call</i>{{user.phone}}</p>
                        <div class="flex">
                            <a class="btn btn-primary btn-rounded" target="_blank" v-if="user.linksLinkedin" title="Linkedin" :href="user.linksLinkedin"><i class="fa fa-linkedin"></i></a>
                            <a class="btn btn-primary btn-rounded" target="_blank" v-if="user.linksStackoverflow" title="Stackoverflow" :href="user.linksStackoverflow"><i class="fa fa-stack-overflow"></i></a>
                            <a class="btn btn-primary btn-rounded" target="_blank" v-if="user.linksGithub" title="Github" :href="user.linksGithub"><i class="fa fa-github"></i></a>
                            <a class="btn btn-primary btn-rounded" target="_blank" v-if="user.linksPortfolio" title="Portfolio" :href="user.linksPortfolio"><i class="fa fa-link"></i></a>
                            <a class="btn btn-primary btn-rounded" target="_blank" v-if="user.linksFacebook" title="Facebook" :href="user.linksFacebook"><i class="fa fa-facebook"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="card" v-if="profile.company">
            <a id="company" class='spy-anchor'></a>
            <div class="row container p-2">
                <div class="col-lg-3 m-auto">
                    <img class="rounded-circle m-auto large-profilePicture"
                    style="height: 100px; width: 100px" 
                    :src="profile.company.photo ? restBaseUrl + 'photo/organization/large-' + profile.company.photo : '/img/company.png'" alt="">
                </div>
                <div class="col-lg-4  d-flex flex-column justify-content-center company-desc" :class="{'notExpanded': (!description_expanded && profile.company.description)}" @click="toggleExpansion">
                    <label class="small mb-0">Organization information</label>
                    <h3 class="my-1">{{profile.company.name}}
                        <router-link class="btn btn-primary btn-sm d-inline-flex align-content-center with-icon" :to="'/profile/organization/' + profile.company._id"><i class="material-icons responsive">remove_red_eye</i> View Company</router-link>
                    </h3>  
                    <p class="" id="rich_desc" v-html="marked(profile.company.description)"></p>
                    <div class="show-more-wrapper" v-if="profile.company.description && profile.company.description.length >= 50">
                        <div class="btn btn-primary btn-sm btn-show-more-less" v-show="!description_expanded">Read More</div>
                        <div class="btn btn-primary btn-sm btn-show-more-less" v-show="description_expanded">Read Less</div>
                    </div>
                </div>
                <div class="col-lg-4 offset-lg-1 d-flex flex-column justify-content-center">
                    <h4 class="h4-responsive my-1" v-if="profile.phone || profile.address || profile.linksLinkedin || profile.linksGithub || profile.linkswebpage || profile.linksFacebook">Contact Information</h4>
                    <span v-if="profile.phone" class="d-flex align-content-center mt-1"><i class="mr-1 material-icons">call</i> {{profile.phone}}</span>
                    <span v-if="profile.address" class="mt-1 d-flex align-content-center"><i class="mr-1 fa fa-address-card-o" aria-hidden="true"></i> {{profile.address}}</span>
                    <div class="flex">
                        <a class="btn btn-primary btn-rounded" target="_blank" v-if="profile.linksLinkedin" title="Linkedin" :href="preProcessURL(profile.linksLinkedin)"><i class="fa fa-linkedin"></i></a>
                        <a class="btn btn-primary btn-rounded" target="_blank" v-if="profile.linksGithub" title="Github" :href="preProcessURL(profile.linksGithub)"><i class="fa fa-github"></i></a>
                        <a class="btn btn-primary btn-rounded" target="_blank" v-if="profile.linkswebpage" title="Official Page" :href="preProcessURL(profile.linkswebpage)"><i class="fa fa-link"></i></a>
                        <a class="btn btn-primary btn-rounded" target="_blank" v-if="profile.linksFacebook" title="Facebook" :href="preProcessURL(profile.linksFacebook)"><i class="fa fa-facebook"></i></a>
                    </div>
                </div>
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


        <div class="card" v-if="profile.awards.length>0">
            <a id="awards" class='spy-anchor'></a>
            <div class="card-block">
                <h3 class="h3-responsive marginless">Awards</h3>
                <hr class="my-2">
                <view-award v-for="(award, index) in profile.awards" :award="award" :key="'award'+index"></view-award>
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
</div>
</template>
<style scoped>
.btn-show-more-less{
    cursor: pointer;
}
.company-desc .btn-show-more-less{
    opacity: 0.2;
}
.company-desc:hover .btn-show-more-less{
    opacity: 1;
    
}
.notExpanded{
    height: 200px;
    padding-bottom: 50px;
    justify-content: flex-start !important;
    overflow: hidden;
    .btn-show-more-less{
        bottom: -10px;
    }
    .show-more-wrapper{
        background: rgba(255,255,255,0);
        background: -moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
        background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(255,255,255,0)), color-stop(100%, rgba(255,255,255,1)));
        background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
        background: -o-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
        background: -ms-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
        background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#ffffff', GradientType=0 );
    }
    .company-desc{
        padding-bottom: 0px;
    }
}

.company-desc{
    padding-bottom: 60px;
}
.show-more-wrapper{
    position: absolute;
    width: 100%;
    bottom: 0px;
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
            restBaseUrl: Vue.rest.restBaseUrl,

            activeSection: 'intro',
            description_expanded:false,

        }
    },
    methods: {
        getData: function(){
            let vm = this;
            let _baseUrl = vm.restBaseUrl;

            Vue.axios.get(_baseUrl + 'api/profile/organizationRepresentative/' + vm.id)
            .then(function(res){
                let _profile = res.data;

                vm.profile = _profile;
                vm.user = _profile.OrganizationRepDetails;

                console.log('vm.profile', vm.profile);
                Vue.nextTick(function () {
                    vm.setWindowScrollFeatures();
                })
            })
            .catch(function(err){console.error(err)});

        },
        
        preProcessURL: function(url){
            if(url.indexOf('//')<0){
                return '//' + url;
            }
            return url;
        },
        marked: function(e){
            return marked(e);
        },
        toggleExpansion: function(){
            if(!this.profile.company.description || this.profile.company.description.length < 50){
                return;
            }
            this.description_expanded = !this.description_expanded;
            console.log(this.description_expanded);
        },
        setWindowScrollFeatures: function(){
            setWindowScrollFeatures();
        },
    },
    mounted: function(){
        this.getData();
    }
}

function setWindowScrollFeatures(){
    $(function () {
        $('a[href*="#"]:not([href="#"])').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 300, 'easeInOutExpo');
                    return false;
                }
            }


        });
    });
}
</script>