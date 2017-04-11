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
                        <a class="nav-link" :class="{active: activeSection==='academic'}" href="#academic">Academic</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="{active: activeSection==='projects'}" href="#projects">Projects</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="{active: activeSection==='competitions'}" href="#competitions">Competitions</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="{active: activeSection==='awards'}" href="#awards">Awards</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="{active: activeSection==='extras'}" href="#co-curricular">Extras</a>
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
                            <vue-photo-upload 
                                class="vue-photo-uploader" 
                                :enableEdits="getEditing('intro')"
                                :photoDefault="user.photo ? restbaseurl + 'photo/user/large-' + user.photo : '/img/user.png'"
                                :buttonClass="'btn btn-primary'"
                                @photo-submit="photo_upload"
                                @photo-change="photo_changed"
                                >
                                

                            </vue-photo-upload>
                            
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
                            <p class="p-responsive d-flex with-icon"><i class="material-icons">call</i><live-edit v-model="user.phone" :editable="getEditing('intro')" v-on:click="setEditing('intro')" placeholder="Your phone number"></live-edit></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card" >
                <a id="academic" class='spy-anchor'></a>
                <div class="card-block">
                    <h3 class="h3-responsive marginless">Academic</h3>
                    <hr class="my-2">
                    <div class="row container">
                        <div class="col-md-3 m-auto">
                            <h1 class="green-text display-3 m-auto text-center">3.4</h1>
                            <h4 class="green-text h4-responsive m-auto text-center">GPA</h4>
                        </div>
                        <div class="col-md-9">
                            <div>
                                <h4 class="h4-responsive">Best Results</h4>
                                <div class="d-flex justify-content-start flex-wrap">
                                    <div class="card green white-text px-3 py-1 mx-0 d-flex-inline flex-row align-items-center tag">
                                        <span>CO424: Networking</span>
                                        <span class="custom-badge primary-custom-badge align-content-end">A+</span>
                                    </div>
                                    <div class="card green darken-1 white-text px-3 py-1 mx-0 d-flex-inline flex-row align-items-center tag">
                                        <span>CO424: Networking</span>
                                        <span class="custom-badge primary-custom-badge align-content-end">A+</span>
                                    </div>
                                    <div class="card green darken-1 white-text px-3 py-1 mx-0 d-flex-inline flex-row align-items-center tag">
                                        <span>CO424: Information Systems</span>
                                        <span class="custom-badge primary-custom-badge align-content-end">A+</span>
                                    </div>
                                    <div class="card green darken-1 white-text px-3 py-1 mx-0 d-flex-inline flex-row align-items-center tag">
                                        <span>CO424: Information Systems</span>
                                        <span class="custom-badge primary-custom-badge align-content-end">A+</span>
                                    </div>
                                </div>
                            </div>
                            <div class="my-2">
                                <a class="btn btn-primary btn-block">View all courses</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card" >
                <a id="projects" class='spy-anchor'></a>
                <div class="card-block">
                    <h3 class="h3-responsive marginless">Projects</h3>
                    <hr class="my-2">
                    <div class="row">
                        <div class="col-md-2">
                            <img src="/img/project.png" class="img-thumbnail mx-auto align-content-center">
                        </div>
                        <div class="col-md-6">
                            <hr class="hidden-sm-up">
                            <h4 class="h4-responsive my-1 my-md-0">Project Title</h4>
                            <p class="text-truncate my-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae magnam a, amet id
                                minus libero repellendus, earum. Quidem ipsum veritatis voluptas sit natus autem,
                            hic cumque explicabo in, eius blanditiis.</p>
                            <div class="">
                                <div class="badge badge-success">Java</div>
                                <div class="badge badge-success">Java</div>
                                <div class="badge badge-success">Java</div>
                            </div>
                            <div class="with-icon d-flex my-1 text-uppercase small"><i class="material-icons responsive">code</i> Individual Project</div>
                        </div>
                        <div class="col-md-4">
                            <div class="actions d-flex justify-content-md-end  justify-content-sm-center">
                                <button class="btn btn-primary px-2"><i class="material-icons responsive">remove_red_eye</i></button>
                                <button class="btn btn-primary px-2"><i class="material-icons responsive">edit</i></button>
                                <button class="btn btn-primary px-2"><i class="material-icons responsive">link</i></button>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-2">
                            <img src="/img/project.png" class="img-thumbnail mx-auto align-content-center">
                        </div>
                        <div class="col-md-6">
                            <hr class="hidden-sm-up">
                            <h4 class="h4-responsive my-1 my-md-0">Project Title</h4>
                            <p class="text-truncate my-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae magnam a, amet id
                                minus libero repellendus, earum. Quidem ipsum veritatis voluptas sit natus autem,
                            hic cumque explicabo in, eius blanditiis.</p>
                            <div class="">
                                <div class="badge badge-success">Java</div>
                                <div class="badge badge-success">Java</div>
                                <div class="badge badge-success">Java</div>
                            </div>
                            <div class="with-icon d-flex my-1 text-uppercase small"><i class="material-icons responsive">code</i> Individual Project</div>
                        </div>
                        <div class="col-md-4">
                            <div class="actions d-flex justify-content-md-end  justify-content-sm-center">
                                <button class="btn btn-primary px-2"><i class="material-icons responsive">remove_red_eye</i></button>
                                <button class="btn btn-primary px-2"><i class="material-icons responsive">edit</i></button>
                                <button class="btn btn-primary px-2"><i class="material-icons responsive">link</i></button>
                            </div>
                        </div>
                    </div>
                    <hr class="my-1">
                    <div class="btn btn-primary with-icon flex-center"><i class="material-icons">add</i> Add New Project</div>
                </div>
            </div>
            <div class="card">
                <a id="competitions" class='spy-anchor'></a>
                <div class="card-block">
                    <h3>Competitions</h3>
                    <hr class="my-2">
                    <div class="row">
                        <div class="col-md-2">
                            <img src="/img/project.png" class="img-thumbnail mx-auto align-content-center">
                        </div>
                        <div class="col-md-6">
                            <hr class="hidden-sm-up">
                            <h4 class="h4-responsive my-1 my-md-0">Competition Title</h4>
                            <p class="text-truncate my-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae magnam a, amet id
                                minus libero repellendus, earum. Quidem ipsum veritatis voluptas sit natus autem,
                            hic cumque explicabo in, eius blanditiis.</p>
                            <div class="">
                                <div class="badge badge-success">Java</div>
                                <div class="badge badge-success">Java</div>
                                <div class="badge badge-success">Java</div>
                            </div>
                            <div class="with-icon d-flex my-1 text-uppercase small"><i class="material-icons responsive">code</i> Individual Project</div>
                        </div>
                        <div class="col-md-4">
                            <div class="actions d-flex justify-content-md-end  justify-content-sm-center">
                                <button class="btn btn-primary px-2"><i class="material-icons responsive">remove_red_eye</i></button>
                                <button class="btn btn-primary px-2"><i class="material-icons responsive">edit</i></button>
                                <button class="btn btn-primary px-2"><i class="material-icons responsive">link</i></button>
                            </div>
                        </div>
                    </div>
                    <hr class="my-1">
                    <div class="btn btn-primary with-icon flex-center"><i class="material-icons">add</i> Add New Competition</div>
                </div>
            </div>
            <div class="card">
                <a id="awards" class='spy-anchor'></a>
                <div class="card-block">
                    <h3>Awards</h3>
                    <hr class="my-2">
                    <div class="row">
                        <div class="col-md-2">
                            <img src="/img/project.png" class="img-thumbnail mx-auto align-content-center">
                        </div>
                        <div class="col-md-6">
                            <hr class="hidden-sm-up">
                            <h4 class="h4-responsive my-1 my-md-0">Competition Title</h4>
                            <p class="text-truncate my-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae magnam a, amet id
                                minus libero repellendus, earum. Quidem ipsum veritatis voluptas sit natus autem,
                            hic cumque explicabo in, eius blanditiis.</p>
                            <div class="">
                                <div class="badge badge-success">Java</div>
                                <div class="badge badge-success">Java</div>
                                <div class="badge badge-success">Java</div>
                            </div>
                            <div class="with-icon d-flex my-1 text-uppercase small"><i class="material-icons responsive">code</i> Individual Project</div>
                        </div>
                        <div class="col-md-4">
                            <div class="actions d-flex justify-content-md-end  justify-content-sm-center">
                                <button class="btn btn-primary px-2"><i class="material-icons responsive">remove_red_eye</i></button>
                                <button class="btn btn-primary px-2"><i class="material-icons responsive">edit</i></button>
                                <button class="btn btn-primary px-2"><i class="material-icons responsive">link</i></button>
                            </div>
                        </div>
                    </div>
                    <hr class="my-1">
                    <div class="btn btn-primary with-icon flex-center"><i class="material-icons">add</i> Add New Award</div>
                </div>
            </div>
            <div class="card">
                <a id="co-curricular" class='spy-anchor'></a>
                <div class="card-block">
                    <h3>Co-curricular</h3>
                    <hr class="my-2">
                    <div class="row">
                        <div class="col-md-2">
                            <img src="/img/project.png" class="img-thumbnail mx-auto align-content-center">
                        </div>
                        <div class="col-md-6">
                            <hr class="hidden-sm-up">
                            <h4 class="h4-responsive my-1 my-md-0">Activity Title</h4>
                            <p class="text-truncate my-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae magnam a, amet id
                                minus libero repellendus, earum. Quidem ipsum veritatis voluptas sit natus autem,
                            hic cumque explicabo in, eius blanditiis.</p>
                            <div class="">
                                <div class="badge badge-success">Java</div>
                                <div class="badge badge-success">Java</div>
                                <div class="badge badge-success">Java</div>
                            </div>
                            <div class="with-icon d-flex my-1 text-uppercase small"><i class="material-icons responsive">code</i> Individual Project</div>
                        </div>
                        <div class="col-md-4">
                            <div class="actions d-flex justify-content-md-end  justify-content-sm-center">
                                <button class="btn btn-primary px-2"><i class="material-icons responsive">remove_red_eye</i></button>
                                <button class="btn btn-primary px-2"><i class="material-icons responsive">edit</i></button>
                                <button class="btn btn-primary px-2"><i class="material-icons responsive">link</i></button>
                            </div>
                        </div>
                    </div>
                    <hr class="my-1">
                    <div class="btn btn-primary with-icon flex-center"><i class="material-icons">add</i> Add New Co-curricular Activity</div>
                </div>
            </div>
            <div class="card">
                <a id="extra-curricular" class='spy-anchor'></a>
                <div class="card-block">
                    <h3>Extra-curricular</h3>
                    <hr class="my-2">
                    <div class="row">
                        <div class="col-md-2">
                            <img src="/img/project.png" class="img-thumbnail mx-auto align-content-center">
                        </div>
                        <div class="col-md-6">
                            <hr class="hidden-sm-up">
                            <h4 class="h4-responsive my-1 my-md-0">Activity Title</h4>
                            <p class="text-truncate my-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae magnam a, amet id
                                minus libero repellendus, earum. Quidem ipsum veritatis voluptas sit natus autem,
                            hic cumque explicabo in, eius blanditiis.</p>
                            <div class="">
                                <div class="badge badge-success">Java</div>
                                <div class="badge badge-success">Java</div>
                                <div class="badge badge-success">Java</div>
                            </div>
                            <div class="with-icon d-flex my-1 text-uppercase small"><i class="material-icons responsive">code</i> Individual Project</div>
                        </div>
                        <div class="col-md-4">
                            <div class="actions d-flex justify-content-md-end  justify-content-sm-center">
                                <button class="btn btn-primary px-2"><i class="material-icons responsive">remove_red_eye</i></button>
                                <button class="btn btn-primary px-2"><i class="material-icons responsive">edit</i></button>
                                <button class="btn btn-primary px-2"><i class="material-icons responsive">link</i></button>
                            </div>
                        </div>
                    </div>
                    <hr class="my-1">
                    <div class="btn btn-primary with-icon flex-center"><i class="material-icons">add</i> Add New Extra-curricular</div>
                </div>
            </div>
            <div class="card">
                <a id="interests" class='spy-anchor'></a>
                <div class="card-block">
                    <h3>Interests</h3>
                    <hr class="my-1">
                    <div class="d-flex justify-content-start align-content-center">
                        <div class="card green white-text px-3 py-1 mx-0 d-inline-flex inline flex-row align-items-center tag">
                            <span class="text-truncate">Graphic Design</span>
                            <span class="custom-badge primary-custom-badge align-content-end d-flex"><i class="material-icons responsive">face</i> 12</span>
                        </div>
                        <p class="text-truncate mx-2 my-auto">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione ab eum soluta modi, praesentium,
                            rem ipsa suscipit ex, et non numquam, nemo. Voluptate est sed, cupiditate architecto
                        eveniet unde error!</p>
                    </div>
                    <div class="d-flex justify-content-start align-content-center">
                        <div class="card green white-text px-3 py-1 mx-0 d-inline-flex inline flex-row align-items-center tag">
                            <span class="text-truncate">Web Development</span>
                            <span class="custom-badge primary-custom-badge align-content-end d-flex"><i class="material-icons responsive">face</i> 12</span>
                        </div>
                        <p class="text-truncate mx-2 my-auto">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione ab eum soluta modi, praesentium,
                            rem ipsa suscipit ex, et non numquam, nemo. Voluptate est sed, cupiditate architecto
                        eveniet unde error!</p>
                    </div>
                    <div class="d-flex justify-content-start align-content-center">
                        <div class="card green white-text px-3 py-1 mx-0 d-inline-flex inline flex-row align-items-center tag">
                            <span class="text-truncate">Backend Analytics</span>
                            <span class="custom-badge primary-custom-badge align-content-end d-flex"><i class="material-icons responsive">face</i> 12</span>
                        </div>
                        <p class="text-truncate mx-2 my-auto">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione ab eum soluta modi, praesentium,
                            rem ipsa suscipit ex, et non numquam, nemo. Voluptate est sed, cupiditate architecto
                        eveniet unde error!</p>
                    </div>
                    <hr class="my-1">
                    <div class="btn btn-primary with-icon flex-center"><i class="material-icons">add</i> Add New Interest</div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
    import Vue from 'vue';
    import restconfig from 'config/rest'
    import VuePhotoUpload from 'components/VuePhotoUpload'

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

    let edit_profile_student_top;
    let edit_profile_student_top_intro;
    let edit_profile_student_top_academic;
    let edit_profile_student_top_projects;
    let edit_profile_student_top_competitions;
    let edit_profile_student_top_awards;
    let edit_profile_student_top_co;
    let edit_profile_student_top_interests;

    export default {
        components: {VuePhotoUpload},
        data(){
            return {
                activeSection: 'intro',
                user: Vue.auth.getUser(),
                editingSection: null,
                photo_user: null,
                photo_user_canvas_id: 'photo_user',
                photo_user_file: null,
                photo_canvas_events_enabled: false,
                restbaseurl: restconfig.url,
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
                        vm.photo_user = null;

                    });
                }
            }
            ,
            setActiveSection: function(section){
                this.activeSection = section;

            },
            handleScroll: function(e){

                // edit_profile_student_top_intro = getCoords(document.getElementById('intro'));
                // edit_profile_student_top_academic = getCoords(document.getElementById('academic'));
                // edit_profile_student_top_projects = getCoords(document.getElementById('projects'));
                // edit_profile_student_top_competitions = getCoords(document.getElementById('competitions'));
                // edit_profile_student_top_awards = getCoords(document.getElementById('awards'));
                // edit_profile_student_top_co = getCoords(document.getElementById('co-curricular'));
                // edit_profile_student_top_interests = getCoords(document.getElementById('interests'));
                // console.log(edit_profile_student_top_intro.top);

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
            Vue.rest.getData('user', '/' + this.user._id, this.getUserInfo);
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