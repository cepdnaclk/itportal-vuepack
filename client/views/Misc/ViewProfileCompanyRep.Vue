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
                    <div class="col-lg-4">
                        <h3 class="h3-responsive my-1">{{user.name}}</h3>
                        <h5 class="h5-responsive text-uppercase grey-text text-darken-2">{{user.title}}</h5>
                        <p class="tagline text-blue-grey text-darken-1">
                            {{user.tagline}}
                        </p>
                    </div>
                    <div class="col-lg-4 offset-lg-1 d-flex flex-column justify-content-center">
                        <h4 class="h4-responsive my-1">Contact Information</h4>
                        <p class="p-responsive d-flex with-icon"><i class="material-icons">email</i>{{user.email}}</p>
                        <p class="p-responsive d-flex with-icon"><i class="material-icons">call</i>{{user.phone}}</p>
                        <div class="flex">
                            <a v-if="user.linksLinkedin" title="Linkedin" :href="user.linkedin"><i class="material-icons">web</i></a>
                            <a v-if="user.linksStackoverflow" title="Stackoverflow" :href="user.stackoverflow"><i class="material-icons">web</i></a>
                            <a v-if="user.linksGithub" title="Github" :href="user.github"><i class="material-icons">web</i></a>
                            <a v-if="user.linksPortfolio" title="Facebook" :href="user.facebook"><i class="material-icons">web</i></a>
                            <a v-if="user.linksFacebook" title="Portfolio" :href="user.portfolio"><i class="material-icons">web</i></a>
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
                <div class="col-lg-4  d-flex flex-column justify-content-center">
                    <h3 class="h3-responsive my-1">{{profile.company.name}}</h3>
                    <p class="">{{profile.company.description}}</p>
                </div>
                <div class="col-lg-4 offset-lg-1 d-flex flex-column justify-content-center">
                    <h4 class="h4-responsive my-1">Contact Information</h4>
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
            })
            .catch(function(err){console.error(err)});

        }
    },
    mounted: function(){
        this.getData();
    }
}
</script>