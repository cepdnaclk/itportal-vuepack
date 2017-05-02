<template>
<div class="tab-pane active">
    <div class="card-block">
        <!--Body-->
        <div class="row">
            <div class="col-md-12 container px-3">
                <h2 class="h2-responsive">My Company Profile</h2>
                <hr class="my-1 mb-2">
                <div class="align-self-center">
                    <router-link :to="{name: 'Organization_dashboard_editcompany_create'}" tag="span" class="btn btn-primary col-sm-3">Create Company</router-link>
                    <span class="d-inline-block">Create a brand new profile for your company on ITPortal</span>
                </div>
                <div class="align-self-center">
                    <router-link :to="{name: 'Organization_dashboard_editcompany_join'}" tag="span" class="btn btn-primary col-sm-3">Join Company</router-link>
                    <span class="d-inline-block">Join an existing company on ITPortal</span>
                </div>
                <transition name="slide-left" mode="out-in">
                    <router-view class="child-view-dash"></router-view>
                </transition>
                <hr class="mt-2">
            </div>
            
        </div>
    </div>
</div>
</template>
<style scoped>
    .child-view-dash-container {
    /*overflow-x: hidden;*/
    /*position: relative;*/
    }
    .child-view-dash {
    position: relative;
    transition: all .2s cubic-bezier(.55,0,.1,1);
    }
    .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
    }
    .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
    }
</style>