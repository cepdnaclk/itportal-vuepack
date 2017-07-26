<template>
<div class="tab-pane active">
    <div class="card-block">
        <!--Body-->
        <div class="row">
            <div class="col-md-12 container px-3" id="mycompany_top">
                <h2 class="h2-responsive">My Company Profile</h2>
                <edit-company-profile v-if="company" :company="company"></edit-company-profile>
                <hr class="my-1 mb-2">
                <h3>Change your company</h3>
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
<script>
    import Vue from 'vue';
    import EditCompanyProfile from './EditCompany/EditCompanyProfile';

    export default {
        components:{
            EditCompanyProfile
        },
        data: function(){
            return {
                test: 'value',
                company: null,
                user: Vue.auth.getUser(),

            }
        },
        methods: {
            getCompanyData: function(res){

                let vm = this;

                Vue.rest.getData('organizationRep', '?query={"email":"' + vm.user.email + '"}&populate=["company"]', function(res){

                    vm.company = res[0].company;
                    console.log('[editcompany]', res);
                    console.log('[editcompany][getcompanydata]', vm.company);

                });
                
            },
            
        },
        mounted: function(){
            this.getCompanyData();
        },
    }
</script>