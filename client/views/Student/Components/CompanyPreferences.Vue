<template>
    <div class="container mt-2">
        <div class="row">
            <div class="form col-md-12 dashboard-itportal">

                <!-- Nav Tabs -->
                <h2>Company Preferences</h2>
                <ul class="nav nav-tabs z-depth-1 mt-1" role="tablist">
                    <li class="nav-item">
                        <router-link :to="{name: 'Student_dashboard_tasks'}" exact class="nav-link with-icon flex-center"><i class="material-icons">arrow_back</i>Back</router-link>
                    </li>
                    <li>
                        <h4 class="section-title">Set your company preferences</h4>
                    </li>
                </ul>

                <div class="tab-content card mb-3 child-view-dash-container">

                    <hr class="my-1">
                    <div class="container companies-selected" v-if="companies_selected.length>0">
                        <h5 class="my-1">Liked Companies <span class="badge badge-success">{{companies_selected.length}} Companies</span> <span class="badge badge-default">selected preference {{activeSlot + 1}}</span></h5>
                        <div v-if="companies_selected.length==0" class="alert alert-warning">Select your preferred companies from below</div>
                        <transition-group name="component-fade" mode="out-in">
                            <div v-for="(company, index) in companies_selected"
                                :key="company"
                                class="company-selected"
                                :class="{active: index==activeSlot}"
                                @click="setActiveSlot(index)"
                                >

                                <span class="preference">{{index + 1}}</span>
                                <img src="/img/user.png" alt="" class="image">
                                <span class="company">{{company.name}}</span>
                                <div class="remove" v-show="company" @click="removeSelected(company)">
                                    <span>X</span>
                                </div>
                            </div >
                        </transition-group>
                    </div>
                    <hr class="my-1">
                    <div class="container companies-not-selected" v-if="sorted_notSelected.length>0">

                        <h5 class="my-1">Other Companies</h5>
                        <p>Choose a company for the selected slot (<span class="badge badge-success">{{activeSlot + 1}}</span>) above, from the following list</p>
                        <transition-group name="component-fade" mode="out-in">
                        	<div v-for="company in sorted_notSelected" 
                            :id="company"
                            :key="company"
                            @click="addSelected(company)"
                            class="company-not-selected">
                                <img src="/img/user.png" alt="" class="image">
                                <span class="company">{{company.name}}</span>
                            </div >
                        </transition-group>
                    </div>
                    <div class="container" v-else>
                        All companies are set. Remove a company to re-order.
                    </div>
                    <hr>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
    .section-title{
        padding: 1rem;
        margin-bottom: 0;
    }
    .company-not-selected{
        padding: 1rem 0.5rem;
        background: #fff;
        display: inline-flex;
        cursor: pointer;
        border-radius: 4px;
        border: solid thin #ccc;
        margin: 2px;

        .image{
            height: 1.5em;
            float: left;
            padding-right: 1em;

        }

        .company{

            overflow: hidden;
            text-overflow: hidden;
            white-space: nowrap;
        }

        &:hover{
            background: #29AE81;
            color: #fff;
        };
    }
    .company-selected{
        padding: 0.5rem;
        margin: 0.2rem;
        border-radius: 4px;
        background: #fff;
        display: inline-flex;
        border: dashed thin #ccc;
        width: 300px;
        position: relative;
        align-content: flex-start;
        overflow: hidden;
            cursor: pointer;

        .image{
            height: 2em;
            float: left;
            align-self: center;
        }
        .company{
            padding: 0.5rem 1rem;
            vertical-align: middle;
            overflow: hidden;
            text-overflow: hidden;
            white-space: nowrap;
        }

        .preference{
            top: 0;
            right: 0;
            padding: 0.5rem 1rem;
            background: rgba(0,0,0,0.7);
            color: #fff;
            border-radius: 4px;
            margin-right: 4px;

        }
        .remove{
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            padding: 0.5rem 1rem;
            background: rgba(0,0,0,0.7);
            color: #fff;
            display: flex;
         
            &:hover{
                background: rgba(0,0,0,0.8);
            }
        }

        &.active,
        &:hover{
            background: #29AE81;
            color: #fff;
        };
    }

    .component-fade-enter-active, .component-fade-leave-active {
        transition: all .3s ease, width .2s ease, padding .2s ease, margin .2s ease;
        width: 300px;
        transform: translateX(0px) scale(1,1);
    }
    .component-fade-enter, .component-fade-leave-to{
        width: 0px;
        transform: translateX(-30px) scale(0.5,0.5);
        opacity: 0;
        padding: 0;
        margin: 0;
    }
</style>

<script>
    import Vue from 'vue';
    import restconfig from 'config/rest';
    import _ from 'lodash';

    import store from 'store';

    export default {
        data(){
            return {
                state: this.$store.state,
                user: Vue.auth.getUser(),
                restbaseurl: restconfig.url,

                companies: [],
                companies_selected: [],
                activeSlot: -1,
                dataChanged: false,
            }
        },
        methods: {
            addSelected: function(company){
                // this.companies.splice(this.companies.indexOf(company), 1);
                this.companies_selected.splice(this.activeSlot, 0, company);

                this.activeSlot++;
                this.dataChanged = true;
            },
            removeSelected: function(company){
                // this.companies.push(company);
                this.companies_selected.splice(this.companies_selected.indexOf(company), 1);

                this.activeSlot--;
                this.dataChanged = true;
            },
            setActiveSlot: function(index){
                this.activeSlot = index;
            },
            updateCompanyPreferences: function(){

                if(!this.dataChanged) return;

                // console.log(this.companies_selected, this.user);
                let _user_id = this.user._id;
                let _companies_all = _.map(this.companies, function(o){
                    return o._id;
                }); 
                let _company_preferences = _.map(this.companies_selected, function(o){
                    return o._id;
                }); 

                let _data = {
                    user: _user_id,
                    organizations: _company_preferences,
                    missed_organizations: _.difference(_companies_all, _company_preferences)
                }

                let _baseURL = Vue.rest.restBaseUrl;
                
                console.log(_baseURL);

                // TODO update post url
                Vue.axios.post(_baseURL + 'api/student/companyPreferences', _data)
                .then(function(res){
                    console.log(res.data)
                    store.dispatch('showMessage', 'Preferences Updated')
                    
                })
                .catch(function(err){console.log(err)});
            },
            retrieveCompanyPreferences: function(){

                let vm = this;

                // all companies
                Vue.rest.getData('organization', '', function(_organizations){
                   console.log('_organizations', _organizations);
                   vm.companies = _organizations;
                });

                // selected companies
                let _baseURL = Vue.rest.restBaseUrl;
                let _user = this.user._id;
                console.log('user', _user);

                Vue.axios.get(_baseURL + 'api/student/companyPreferences/' + _user)
                .then(function(res){

                    let _data = res.data;
                    let _companies_selected_fromDB = _.map(_data, function(o){
                        return o.organization;
                    });

                    if(!_companies_selected_fromDB){
                        return;
                    }

                    // console.log(_companies_selected_fromDB);
                   console.log('_companies_selected_fromDB', _companies_selected_fromDB);

                    vm.companies_selected = _.filter(_companies_selected_fromDB, function(o){
                        return !_.isNull(o);
                    });
                    store.dispatch('showMessage', 'Retrieved your existing preferences')
                    
                })
                .catch(function(err){console.log(err)});
            }
        },
        computed: {
            sorted_notSelected:function(){
                let vm = this;
                let _not_selected;
                let _selected_ids = _.map(vm.companies_selected, function(o){
                    return o._id;
                });

                _not_selected = _.map(vm.companies, function(o){
                    if(!_.includes(_selected_ids, o._id)){
                        console.log('id', _selected_ids, o._id)
                        return o;
                    }
                    
                })


                return _.without(_.sortBy(_not_selected, [function(o) { return o; }]), undefined);
            }
        },
        watch: {
            companies_selected: _.debounce(function(){
                this.updateCompanyPreferences();
            }, 500)
        },
        mounted: function(){
            this.retrieveCompanyPreferences();
        },
        beforeDestroy: function(){
        
            this.updateCompanyPreferences();        
        }

}
</script>