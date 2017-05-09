<template>
<div class="row">
    <div class="col-md-2">
        <img src="/img/project.png" class="img-thumbnail mx-auto align-content-center">
    </div>
    <div class="col-md-6">
        <hr class="hidden-sm-up">
        <h4 class="h4-responsive my-1 my-md-0">{{cocurricular.title}}</h4>
        <p class="text-truncate my-0">{{cocurricular.description}}</p>
        <div class="">
            <div class="badge badge-success">Java</div>
            <div class="badge badge-success">Java</div>
            <div class="badge badge-success">Java</div>
        </div>
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
        cocurricular: {
            type: Object,
        }
    }
}
</script>

