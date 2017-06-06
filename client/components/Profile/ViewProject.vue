<template>
<div class="row my-3">
    <div class="col-md-2">
        <img src="/img/project.png" class="rounded-circle mx-auto align-content-center" style="width:100px; height: 100px;">
    </div>
    <div class="col-md-6">
        <hr class="hidden-sm-up">
        <h4 class="h4-responsive my-1 my-md-0">{{project.title}}</h4>
        <p class="text-truncate my-0">{{project.description}}</p>
        <div class="">
            <div class="badge badge-success mr-1" v-for="skill in project.skills">{{skill.name}}</div>
        </div>
        <div class="with-icon d-flex my-1 text-uppercase small"><i class="material-icons responsive">code</i> {{project.type}} Project</div>
    </div>
    <div class="col-md-4">
        <div class="actions d-flex justify-content-md-end  justify-content-sm-center">
            <button class="btn btn-primary px-2"><i class="material-icons responsive">remove_red_eye</i></button>
            <button class="btn btn-primary px-2"><i class="material-icons responsive">edit</i></button>
            <button class="btn btn-primary px-2"><i class="material-icons responsive">link</i></button>
        </div>
    </div>
</div>    
</template>

<script>
export default{
    
    props: {
        project: {
            type: Object,
        }
    }
}
</script>

