<template>
<div>
    <form @submit.prevent="addFormData" v-show="isEditing">
        <hr>
        <div class="row">
            <div class="col-md-2">
                <img src="/img/project.png" class="rounded-circle mx-auto align-content-center" style="width:100px; height: 100px;">
            </div>
            <div class="col-md-6">
                <hr class="hidden-sm-up">
                <label>Project Title<input type="text" class="" v-model="project.title" placeholder="Your project title"></label>
                <label class="mt-1">Project Description<textarea type="text" class="md-textarea" v-model="project.description" placeholder="Your project description"></textarea></label>

                <div class="my-1">
                    <label class="dates">Date Started<input type="date"  v-model="project.dateStarted"></label>
                    <label class="dates">Date Ended<input type="date"  v-model="project.dateEnded"></label>
                </div>
                <div class="my-1 teal lighten-5 p-2" v-if="editingNewSkill">
                    <p>Add New Skill</p>
                    <label>
                        Name of skill
                        <input type="text" v-model="newSkill_name">
                    </label>
                    <label>Type of skill
                        <multiselect
                          v-model="newSkill_type"
                          :options="skillTypes"
                          placeholder="Which type of a skill is this?"
                          label="label"
                          track-by="id"
                        ></multiselect>
                    </label>
                    <button @click.prevent="addNewSkillToList" class="btn btn-primary">Add skill</button>                    
                </div>

                <div class="my-2">
                    <label>Skills related with the project
                        <multiselect style="margin-top: 0.3em"
                          v-model="skills"
                          :options="skills_all"
                          :multiple="true"
                          :taggable="true"
                          @tag="addNewSkill"
                          tag-placeholder="Add this as a new skill"
                          placeholder="Type to search or add new skill"
                          label="name"
                          track-by="name"
                        ></multiselect>
                    </label>
                </div>
                

                <div class="my-1">
                    <label> Project Type
                        <select id="" class="form-control" v-model="project.type">
                            <option value="ACADEMIC">Academic Project</option>
                            <option value="INDUSTRIAL">Industrial Project</option>
                            <option value="INDIVIDUAL">Individual Project</option>
                            <option value="FREELANCE">Freelance Project</option>
                        </select>
                    </label>
                    
                </div>

                <br>
                <br>
                
            </div>
            <div class="col">
                <div class="actions d-block">
                    <button type="submit" class="btn btn-primary px-2 flex-center with-icon btn-block"><i class="material-icons responsive">add</i> Add Project</button>
                    <button type="reset" @click.prevent="resetFormData" class="btn btn-primary px-2 flex-center with-icon btn-block"><i class="material-icons responsive">undo</i> Reset</button>
                </div>
            </div>
        </div>    
    </form>

    <div class="row" @click="toggleEditing" v-if="isEditing">
        <div class="btn btn-primary with-icon flex-center full-width" ><i class="material-icons">arrow_back</i> Dismiss</div>
    </div>
    <div class="row" @click="toggleEditing" v-else>
        <div class="btn btn-primary with-icon flex-center full-width" ><i class="material-icons">add</i> Add New Project</div>
    </div>   
</div>
</template>
<style scoped>
    input, textarea{
        margin: 0;
        padding-top: 0.3em;
    }
    label{
        width: 100%;
        &.dates{
            width: 48%;
        }
    }
</style>
<script>
import Vue from 'vue';
import Multiselect from 'vue-multiselect'
import store from 'store'

export default{

    components: { Multiselect },
    props: {
        authorType: {
            required: true,
            default: 'student'
        },
    },
    data: function(){

        return {
            isEditing: false,
            project: {
                title: '',
                type: 'ACADEMIC',
                description: '',
                dateStarted: null,
                dateEnded: null,
                skills: [],
                authorEmail: Vue.auth.getUser().email,
                authorType: this.authorType,
            },

            skillTypes:[
                {id:'DEVELOPMENTENVIRONMENT', label: 'Development Environment'},
                {id:'LANGUAGES', label: 'Languages'},
                {id:'FRAMEWORKS', label: 'Frameworks'},
                {id:'SOFTWARE', label: 'Software'},
                {id:'HARDWARE', label: 'Hardware'},
                {id:'THEORETICALKNOWLEDGE', label: 'Theoretical Knowledge'},
                {id:'SOFTSKILLS', label: 'Soft skills'},
            ],

            skills:[],
            skills_all:[],

            newSkill_name: '',
            newSkill_type: '',

            editingNewSkill: false,
        }
    },
     methods: {
        addFormData: function(){
            let vm = this;
            Vue.rest.insertData(this.project, 'project', null, function(res){
                console.log(res);
                if(res){
                    vm.$emit('project-uploaded', res);
                    vm.resetFormData();
                    vm.isEditing = false;
                }
            });
        },
        toggleEditing: function(){
            this.isEditing = !this.isEditing;
        },
        resetFormData: function(){

            let _emptyProject = {

                title: '',
                type: 'ACADEMIC',
                description: '',
                dateStarted: null,
                dateEnded: null,
                skills: [],
                authorEmail: Vue.auth.getUser().email,
                authorType: this.authorType,

            };

            this.project = _emptyProject;
            this.skills = [];
        },
        addNewSkill: function(newSkillName){

            this.editingNewSkill = true;
            this.newSkill_name = newSkillName;

        },
        addNewSkillToList: function(){

            let vm = this;

            const _skill = {
                name: this.newSkill_name,
                type: this.newSkill_type.id
            }

            store.dispatch('showMessage', 'Adding New Skill')
            Vue.rest.insertData(_skill, 'skill', null, function(res){
                if(res){

                    // console.log(res);
                    vm.skills.push(res)
                    vm.skills_all.push(res);

                    store.dispatch('showMessage', 'New skill successfully added.');
                    vm.editingNewSkill = false;

                    vm.newSkill_type = '';
                    vm.newSkill_name = '';
                } else {
                    store.dispatch('showMessage', 'Adding new skill failed.');
                }
            });

        },

        getAllSkills: function(){

            let vm = this;

            Vue.rest.getData('skill', '' , function(_skills){
                console.log('_skills:',_skills);
                vm.skills_all = _skills;
            });
        },

    },
    mounted: function(){
        this.getAllSkills();
    },
    watch: {
        skills: function(){
            let vm = this;
            let _skill_ids = _.map(vm.skills, function(o){
                if(o._id){
                    return o._id;
                }
                return;
            })
            vm.project.skills = _skill_ids;
        }
    }
}
</script>


<style src="./vue.multiselect.min.css"></style>
