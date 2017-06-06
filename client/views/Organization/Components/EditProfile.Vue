<template>
<div class="tab-pane active">
    
    <div class="col">
        <nav id="navbar-scrollspy" class="sticky-top navbar navbar-toggleable-md navbar-light nav-secondary-itportal white lighten-5 hidden-md-down">
            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavSecondary"
            aria-controls="navbarNavSecondary" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <a class="navbar-brand" href="#" style="margin-right: 0">
                <img class="rounded-circle" :src="user.photo ? (restbaseurl + 'photo/user/small-' + user.photo) : '/img/user.png'" style="height: 1.5em; border-radius: 1.5em" alt="" />
            </a>
            <div class="collapse navbar-collapse" id="navbarNavSecondary">
                <ul class="navbar-nav d-flex">
                    <li class="nav-item">
                        <a class="nav-link" :class="{active: activeSection==='intro'}" href="#intro">Intro</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="{active: activeSection==='projects'}" href="#projects">Projects</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="{active: activeSection==='awards'}" href="#awards">Awards</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="{active: activeSection==='interests'}" href="#interests">Interests</a>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="content profile-cards">
            <div class="card">
                <a class="btn d-flex with-icon p-2 edit-icon" @click="setEditing('intro')" :class="{'btn-primary editing': getEditing('intro'), 'btn-link': !getEditing('intro') }"><i class="material-icons responsive">{{getEditing('intro')?'check':'edit'}}</i> {{getEditing('intro')?'Done':'Edit'}}</a>
                <a id="intro" class='spy-anchor' style="top: -300px;"></a>
                <div class="card-block">
                    <div class="row container">
                        <div class="col-lg-3 m-auto">
                            <photo-upload 
                                :enableEdits="getEditing('intro')"
                                :photoDefault="user.photo ? restbaseurl + 'photo/user/large-' + user.photo : '/img/user.png'"
                                :buttonClass="'btn btn-primary'"
                                :showMessages="true"
                                @photo-submit="photo_upload"
                                @photo-change="photo_changed"
                                >
                            </photo-upload>
                            
                        </div>
                        <div class="col-lg-4">
                            <h3 class="h3-responsive my-1">
                                <live-edit v-model="user.name" :editable="getEditing('intro')" v-on:click="setEditing('intro')" placeholder="Your Display Name (e.g. Ishan Madhusanka)"></live-edit>
                            </h3>
                            <h5 class="h5-responsive text-uppercase grey-text text-darken-2">
                                <live-edit v-model="user.title" :editable="getEditing('intro')" v-on:click="setEditing('intro')" placeholder="Your Title (e.g. Embedded Systems Lover)"></live-edit>
                            </h5>
                            <p class="tagline text-blue-grey text-darken-1">
                                <live-edit v-model="user.tagline" :editable="getEditing('intro')" v-on:click="setEditing('intro')" placeholder="Tell people about your passion" :multiline="true"></live-edit>
                            </p>
                        </div>
                        <div class="col-lg-4 offset-lg-1 d-flex flex-column justify-content-center">
                            <h4 class="h4-responsive my-1">Contact Information</h4>
                            <p class="p-responsive d-flex with-icon"><i class="material-icons">email</i>{{user.email}}</p>
                             <p class="p-responsive d-flex with-icon"><i class="material-icons">email</i>{{user.email}}</p>
                            <p class="p-responsive d-flex with-icon"><i class="material-icons">call</i><live-edit v-model="user.phone" :editable="getEditing('intro')" v-on:click="setEditing('intro')" placeholder="[Your phone number]"></live-edit></p>
                            <p class="p-responsive d-flex with-icon"><i class="material-icons">web</i><live-edit v-model="user.linksLinkedin" :editable="getEditing('intro')" v-on:click="setEditing('intro')" placeholder="[Your LinkedIn account]"></live-edit></p>
                            <p class="p-responsive d-flex with-icon"><i class="material-icons">web</i><live-edit v-model="user.linksStackoverflow" :editable="getEditing('intro')" v-on:click="setEditing('intro')" placeholder="[Your Stackoverflow account]"></live-edit></p>
                            <p class="p-responsive d-flex with-icon"><i class="material-icons">web</i><live-edit v-model="user.linksGithub" :editable="getEditing('intro')" v-on:click="setEditing('intro')" placeholder="[Your GitHub Account]"></live-edit></p>
                            <p class="p-responsive d-flex with-icon"><i class="material-icons">web</i><live-edit v-model="user.linksPortfolio" :editable="getEditing('intro')" v-on:click="setEditing('intro')" placeholder="[Your Personal Webpage]"></live-edit></p>
                            <p class="p-responsive d-flex with-icon"><i class="material-icons">web</i><live-edit v-model="user.linksFacebook" :editable="getEditing('intro')" v-on:click="setEditing('intro')" placeholder="[Your Facebook account]"></live-edit></p>
                        
                        </div>
                    </div>
                </div>
            </div>
            <div class="card" >
                <a id="projects" class='spy-anchor'></a>
                <div class="card-block">
                    <h3 class="h3-responsive marginless">Projects</h3>
                    <hr class="my-2">
                    <div v-if="projects.length == 0" class="flex-center h5 text-warning"><i class="material-icons responsive">info</i> No projects to show</div>
                    <view-project v-for="(project, index) in projects" :project="project" :key="'project'+index"></view-project>
                    <hr class="my-1">
                    <edit-project @project-uploaded="projectUploaded" author-type="companyRep"></edit-project>
                </div>
            </div>
            
            <div class="card" >
                <a id="awards" class='spy-anchor'></a>
                <div class="card-block">
                    <h3 class="h3-responsive marginless">Awards</h3>
                    <hr class="my-2">
                    <div v-if="awards.length == 0" class="flex-center h5 text-warning"><i class="material-icons responsive">info</i> No awards to show</div>
                    <view-award v-for="(award, index) in awards" :award="award" :key="'award'+index"></view-award>
                    <hr class="my-1">
                    <edit-award @award-uploaded="awardUpload" author-type="companyRep"></edit-award>
                </div>
            </div>

            <div class="card">
                <a id="interests" class='spy-anchor'></a>
                <div class="card-block">
                    <h3>Interests</h3>
                    <hr class="my-1">
                    <div v-if="interests.length == 0" class="flex-center h5 text-warning"><i class="material-icons responsive">info</i> No awards to show</div>
                    <view-interest v-for="(interest, index) in interests" :interest="interest" :key="'interest'+index"></view-interest>
                    <hr class="my-1">
                    <edit-interest @interest-uploaded="interestUpload" :all-interests="all_interests"></edit-interest>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
    import Vue from 'vue';
    import restconfig from 'config/rest'

    import ViewProject from 'components/Profile/ViewProject'
    import ViewAward from 'components/Profile/ViewAward'
    import ViewInterest from 'components/Profile/ViewInterest'

    import EditProject from 'components/Profile/EditProject'
    import EditAward from 'components/Profile/EditAward'
    import EditInterest from 'components/Profile/EditInterest'

    function getOffsetTop( elem )
    {
        let offsetTop = 0;
        do {
          if ( !isNaN( elem.offsetTop ) )
          {
              offsetTop += elem.offsetTop;
          }
        } while( elem = elem.offsetParent );
        return offsetTop;
    }
    function getCoords(elem) { // crossbrowser version
        let box = elem.getBoundingClientRect();
        // let top  = box.top;
        return box;

        return Math.round(top);
    }

    let edit_profile_organizationRep_top;
    let edit_profile_organizationRep_top_intro;
    let edit_profile_organizationRep_top_academic;
    let edit_profile_organizationRep_top_projects;
    let edit_profile_organizationRep_top_competitions;
    let edit_profile_organizationRep_top_awards;
    let edit_profile_organizationRep_top_co;
    let edit_profile_organizationRep_top_interests;

    export default {
        components: {
            ViewProject,
            ViewAward,
            ViewInterest,

            EditProject,
            EditAward,
            EditInterest,
        },
        data(){
            return {
                activeSection: 'intro',
                user: Vue.auth.getUser(),
                editingSection: null,
                restbaseurl: restconfig.url,

                projects: [],
                awards: [],
                interests: [],
                all_interests: [],
            }
        },
        methods: {
            photo_changed: function(e){
                console.log('photo_changed');
                console.log(e);
            },

            photo_upload: function(e, file){
                console.log(e, file);
                let vm = this;

                if(file){
                    Vue.rest.putImageUpload({
                        photo: file,
                        email: this.user.email,
                    },
                    'user', function(data){
                        console.log(data);

                        vm.user = data.user;
                        Vue.auth.setUser(data.user);

                    });
                }
            }
            ,
            setActiveSection: function(section){
                this.activeSection = section;

            },
            handleScroll: function(e){

                // edit_profile_organizationRep_top_intro = getCoords(document.getElementById('intro'));
                // edit_profile_organizationRep_top_academic = getCoords(document.getElementById('academic'));
                // edit_profile_organizationRep_top_projects = getCoords(document.getElementById('projects'));
                // edit_profile_organizationRep_top_competitions = getCoords(document.getElementById('competitions'));
                // edit_profile_organizationRep_top_awards = getCoords(document.getElementById('awards'));
                // edit_profile_organizationRep_top_co = getCoords(document.getElementById('co-curricular'));
                // edit_profile_organizationRep_top_interests = getCoords(document.getElementById('interests'));
                // console.log(edit_profile_organizationRep_top_intro.top);

            },
            setEditing: function(section){
                if(this.getEditing(section) === true){
                    if(section === 'intro'){
                        this.saveUserInfo();
                    }
                    this.editingSection = null;

                } else {
                    this.editingSection = section;
                }
            },
            getEditing: function(section){
                return this.editingSection === section;
            },
            getUserInfo: function(_user){
                if(_user) {
                    Vue.auth.setUser(_user);
                }
                console.log(this.user);

                let vm = this;

                Vue.rest.getData('organizationRep', '?query={"email":"' + this.user.email + '"}', function(_companyRep){
                    console.log(_companyRep[0]);
                    console.log(_companyRep[0]._id);
                    vm.organizationRep_id = _companyRep[0]._id;
                    console.log(vm.organizationRep_id);

                    Vue.rest.getData('organizationRep', '/' + _companyRep[0]._id + '?populate=["projects","awards"]', function(_companyRep){

                        vm.awards = _companyRep.awards;

                        let _projectIds = _.map(_companyRep.projects, function(o){
                            return o._id;
                        });

                        let _baseUrl = Vue.rest.restBaseUrl;

                        Vue.axios.post(_baseUrl + 'api/company/projects', {projects: _projectIds})
                        .then(function(res){
                            vm.projects = res.data;
                            console.log('projects', res);
                        })
                        .catch(function(err){console.log(err)});

                    });

                    Vue.rest.getData('interest', '?populate=["students","organizationRep"]', function(_interests){
                        vm.all_interests = _interests;
                        vm.interests = _.filter(_interests, function(o){

                            // check if this user has the interest

                            let _has_interest = false;

                            _.forEach(o.organizationRep, function(u){
                                if(u.email === vm.user.email){
                                    console.log(vm.user.email);
                                    _has_interest = true;
                                }
                            });
                            return _has_interest;

                        });

                        console.log('_interests', _interests);
                        console.log('vm.interests', vm.interests);
                    });

                });
            },
            saveUserInfo: function(){
                let vm = this;
                Vue.rest.updateData(this.user, 'user', '/' + this.user._id, function(res){
                    if(res){
                        vm.user = res;
                        Vue.auth.setUser(res);
                    }
                });
            },
            projectUploaded: function(e){
                 this.projects.push(e);
            },
            awardUpload: function(e){
                this.awards.push(e);
            },
            interestUpload: function(e){
                this.interests.push(e);
            }
        },
        watch: {
            'user.name': function(){
                this.$store.commit('CHANGE_USER', this.user);
            }
        },
        created () {
            window.addEventListener('scroll', this.handleScroll);
        },
        mounted(){
            Vue.rest.getData('user', '/' + this.user._id , this.getUserInfo);
        },
        destroyed () {
            window.removeEventListener('scroll', this.handleScroll);
        },
    }

</script>

<style>
.tagline{
    font-size: 1.1rem !important;
    text-align: center;
}
.large-profilePicture{
    height: 196px;
    width: 196px;
    border-radius: 196px !important;
    display: block;
    max-width: 100%;
    height: auto;
}    
.card {
    position: relative;
}
.card .edit-icon{
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
}
.card .edit-icon.editing{
    right: 10px;
    /*top: 10px;*/
}
.card:hover .edit-icon{
    /*opacity: 1;*/
}
</style>

<!-- @mouseenter="setActiveSection('intro')"
@mouseenter="setActiveSection('academic')"
@mouseenter="setActiveSection('projects')"
@mouseenter="setActiveSection('competitions')"
@mouseenter="setActiveSection('awards')"
@mouseenter="setActiveSection('extras')"
@mouseenter="setActiveSection('extras')"
@mouseenter="setActiveSection('interests')" -->