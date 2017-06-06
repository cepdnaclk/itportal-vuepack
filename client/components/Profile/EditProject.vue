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
                <h4 class="h4-responsive my-1 my-md-0"><input type="text" placeholder="Project Title" v-model="project.title"></h4>
                <textarea placeholder="Project Description"  v-model="project.description"></textarea>
                <input type="date"  v-model="project.dateStarted">
                <input type="date"  v-model="project.dateEnded">

                
                <div class="my-1"  v-if="editingNewSkill">
                    <p>Add New Skill</p>
                    <input type="text" v-model="newSkill_name">
                    <p>Skill type</p>
                    <multiselect
                      v-model="newSkill_type"
                      :options="projectTypes"
                      tag-placeholder="Which type of a skill is this?"
                      label="label"
                      track-by="id"
                    ></multiselect>
                    <button @click.prevent="addNewSkillToList">Add skill</button>                    
                </div>
                <div class="my-2">
                    <p>Select from existing skills</p>
                    <multiselect
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
                </div>
                

                <div class="my-1">
                    <label> Project Type
                        <select id="" v-model="project.type">
                            <option value="ACADEMIC">Academic Project</option>
                            <option value="INDUSTRIAL">Industrial Project</option>
                            <option value="INDIVIDUAL">Individual Project</option>
                            <option value="FREELANCE">Freelance Project</option>
                        </select>
                    </label>
                    
                </div>
                

                <div class="with-icon d-flex my-1 text-uppercase small"><i class="material-icons responsive">code</i> Individual Project</div>
            </div>
            <div class="col-md-4">
                <div class="actions d-flex justify-content-md-end  justify-content-sm-center">
                    <button type="submit" class="btn btn-primary px-2 flex-center  with-icon"><i class="material-icons responsive">add</i> Add Project</button>
                    <button type="reset" @click.prevent="resetFormData" class="btn btn-primary px-2 flex-center  with-icon"><i class="material-icons responsive">undo</i> Reset</button>
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

<script>
import Vue from 'vue';
import Multiselect from 'vue-multiselect'


export default{

    components: { Multiselect },
    props: {
        authorType: {
            required: true,
            default: 'student'
        },
    },
    data(){

        return{
            isEditing: false,
            project: {
                title: '',
                type: 'ACADEMIC',
                description: '',
                dateStarted: null,
                dateEnded: null,
                authorEmail: Vue.auth.getUser().email,
                authorType: this.authorType,
            },

            projectTypes:[
                {id:'DEVELOPMENTENVIRONMENT', label: 'Development Environment'},
                {id:'LANGUAGES', label: 'Languages'},
                {id:'FRAMEWORKS', label: 'Frameworks'},
                {id:'SOFTWARE', label: 'Software'},
                {id:'HARDWARE', label: 'Hardware'},
                {id:'THEORETICALKNOWLEDGE', label: 'Theoretical Knowledge'},
                {id:'SOFTSKILLS', label: 'Soft skills'},
            ],

            skills:[],
            skills_all:[
                {name: 'Dev ops', type: 'DEVELOPMENTENVIRONMENT'},
                {name: 'Java', type: 'SOFTWARE'}
            ],

            newSkill_name: '',
            newSkill_type: '',

            editingNewSkill: false,
        }
    },
     methods: {
        addFormData: function(){
            let vm = this;
            Vue.rest.insertData(this.project, 'project', null, function(res){
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
            this.project = {
                title: '',
                type: 'ACADEMIC',
                description: '',
                dateStarted: null,
                dateEnded: null,
                authorEmail: Vue.auth.getUser().email,
                authorType: this.AuthorType,
            };
        },
        addNewSkill: function(newSkillName){
            console.log('newSkillName', newSkillName)
            this.editingNewSkill = true;
            this.newSkill_name = newSkillName;

        },
        addNewSkillToList: function(){

            ;
            const _skill = {
                name: this.newSkill_name,
                type: this.newSkill_type
            }

            this.skills.push(_skill)
            this.skills_all.push(_skill);

            

        },

    }
}
</script>


<style src="./vue.multiselect.min.css"></style>