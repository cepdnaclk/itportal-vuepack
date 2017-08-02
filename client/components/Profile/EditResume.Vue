<template>
<div>
    <form @submit.prevent="addFormData">
        <div class="row">
            <div class="container">
                <form @submit.prevent="resume_submit">
                    
                    <label for="resume">Select your resume file to upload</label><br>
                    <input
                        id="vue-resume-upload-file-input"
                        type="file"
                        @change="resume_change">
                    <input type="submit" class="btn btn-primary" :value="upload_button_txt">
                    <a v-if="student_resume || uploaded_file_name" target="_blank" :href="restBaseUrl + '/api/all/student/cv/'+ (uploaded_file_name || student_resume)" class="btn btn-primary d-inline-flex align-items-center"><i class="material-icons">perm_identity</i> View Resume</a>
                </form>
            </div>
        </div>    
    </form>
    <hr>
</div>
</template>
<style scoped>

</style>
<script>
import Vue from 'vue';
import store from 'store'

export default{
    props: {
        student_id:{
            type: String
        },
        student_resume: {
            type: String
        }
    },
    data: function(){

        return {
            vue_resumeFile: null,
            restBaseUrl: Vue.rest.restBaseUrl,

            upload_button_txt: 'Upload Resume',
            uploaded_file_name: null,

        }
    },
     methods: {
        
        resume_submit: function(e){

            let vm = this;

            if(!this.vue_resumeFile){
                return;
            }

            Vue.rest.putResumeUpload({
                resume: this.vue_resumeFile,
                student_id: this.student_id,
            }, function(data){
                console.log('student resume uploaded.. ', data);
                vm.upload_button_txt = 'Uploaded your resume';
                vm.uploaded_file_name = data.student.resume;
            });
            
        },
        resume_change: function(e){
            this.upload_button_txt = 'Upload Resume';
            if (e.srcElement.files && e.srcElement.files[0]) {
                this.vue_resumeFile = e.srcElement.files[0];
            } else {

            }
        },

    },
    mounted: function(){
    },
    watch: {
    }
}
</script>


<style src="./vue.multiselect.min.css"></style>
