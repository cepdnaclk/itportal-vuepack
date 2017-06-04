<template>
<div class="tab-pane active">
    <h1>ViewProfileCompanyRep</h1>
    <h2>{{id}}</h2>
</div>
</template>
<script>
import Vue from 'vue'

export default {
    props: ['id'],
    data: ()=>{
        return {
            profile: {}
        }
    },
    methods: {

    },
    mounted: {

    }
}
</script>