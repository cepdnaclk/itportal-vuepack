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
                        <h5 class="my-1">Liked Companies <span class="badge badge-success">{{companies_selected.length}} Companies</span> <span class="badge badge-default">selected slot {{activeSlot + 1}}</span></h5>
                        <div class="alert alert-info">Select a company from the list as your <b>choice {{activeSlot + 1}}</b> <span v-show="companies_selected.length>0">or select a slot from below</span></div>
                        <div v-if="companies_selected.length==0" class="alert alert-warning">Select your preferred companies from below</div>
                        <transition-group name="component-fade" mode="out-in">
                            <div v-for="(company, index) in companies_selected"
                                :key="company"
                                class="company-selected"
                                :class="{active: index==activeSlot}"
                                @click="setActiveSlot(index)"
                                >

                                <span class="preference">{{index + 1}}</span>
                                <img class="rounded-circle image" :src="company.photo ? (restUrl + 'photo/organization/large-' + company.photo) : '/img/company.png'" style="height: 2em; width: 2em !important; border-radius: 2em;" alt=""/>
                                <span class="company">{{company.name}}</span>

                                <span class="tip faded float-right pl-3 small d-inline-block align-content-center">Click here and select this slot to add a preference as choice {{index + 1}}</span>
                                <span class="status" v-if="company_preferences[company._id]">
                                    <span class="padded"><span class="dot" :class="{'active': company_preferences[company._id].admin_approved}" :title="(company_preferences[company._id].admin_approved?'':'Not ') + 'Allocated to Company'"></span></span>
                                    <span class="padded"><span class="dot" :class="{'active': company_preferences[company._id].company_viewed}" :title="(company_preferences[company._id].company_viewed?'':'Not ') + 'Viewed by Company'"></span></span>
                                    <span class="padded"><span class="dot" :class="{'active': company_preferences[company._id].company_interviewed}" :title="(company_preferences[company._id].company_interviewed?'':'Not ') + 'Scheduled an Interview'"></span></span>
                                    <span class="padded"><span class="dot" :class="{'active': company_preferences[company._id].company_accepted}" :title="(company_preferences[company._id].company_accepted?'':'Not ') + 'Accepted by the Company'"></span></span>
                                </span>
                                <div class="remove" v-show="company" @click="removeSelected(company)">
                                    <span>X</span>
                                </div>
                            </div >
                        </transition-group>
                    </div>
                    <hr class="my-1">
                    <div class="container companies-not-selected">

                        <h5 class="my-1">Other Companies</h5>
                        <p>Choose a company for the selected slot (<span class="badge badge-success">{{activeSlot + 1}}</span>) above, from the following list
                        <input class="form-control mt-1" type="text" placeholder="Type to search for a company" v-model="company_not_selected_search">
                        </p>

                        <div v-if="sorted_notSelected.length>0" class="pt-1">
                            <transition-group name="component-fade" mode="out-in">
                            	<div v-for="company in sorted_notSelected" 
                                :id="'company' + company._id"
                                :key="company"
                                @click="addSelected(company)"
                                class="company-not-selected align-content-center">
                                    <img class="rounded-circle image" :src="company.photo ? (restUrl + 'photo/organization/large-' + company.photo) : '/img/company.png'" style="height: 2em; width: 2em !important; border-radius: 2em;" alt=""/>
                                    <span class="company">{{company.name}}</span>
                                    <span class="tip faded float-right pl-3 small d-inline-block align-content-center">Click to add this company as choice {{activeSlot + 1}}</span>
                                </div >
                            </transition-group>
                        </div>
                        <div class="container pt-1" v-else>
                            <span v-if="company_not_selected_search != ''">No company found. Clear the search and try again.</span>
                            <span v-else>All companies are set. Remove a company to re-order.</span>
                        </div>
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
        width: 49%;
        align-content: center;

        .image{
            float: left;
        }

        .company{
            padding-left: 1em;
            overflow: hidden;
            text-overflow: hidden;
            white-space: nowrap;
        }

        .tip{
            align-self: center;
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
        display: flex;
        align-content: center;
        justify-content: justify;
        border: dashed thin #ccc;
        width: 100%;
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

        .tip{
            align-self: center;
        }

        .status{
            position: absolute;
            top: 0;
            right: 60px;
            height: 100%;
            padding: 0.5rem 1rem;
            background: rgba(255,255,255,0.5);
            color: #333;
            display: flex;
            justify-content: center;
            align-items: center;
         
            .padded{
                padding: 0 0.3em;
            }
            .dot{
                display: block;
                width: 2em;
                height: 2em;
                padding: 0 0.5em;
                border-radius: 50%;
                background: #ccc;
                border: solid thin #fff;
                &.active{
                    background: #29AE81;
                }
            }
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
        transition: all .3s cubic-bezier(0.07, 0.63, 0.25, 1);
        transform: translateY(0px) scale(1,1);
    }
    .component-fade-enter, .component-fade-leave-to{
        height: 0px;
        transform: translateY(-10px) scale(0.5,0.5);
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
                restUrl: Vue.rest.restBaseUrl,

                companies: [],
                companies_selected: [],
                activeSlot: 0,
                dataChanged: false,
                company_not_selected_search: '',

                company_preferences: [],
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

                // TODO update post url
                Vue.axios.post(_baseURL + 'api/student/companyPreferences', _data)
                .then(function(res){
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
                    console.log('_data', _data);


                    let _data_sorted = _.sortBy(_data, function(o){
                        return o.preference;
                    })

                    _data_sorted = _.filter(_data_sorted, function(o){
                        return !_.isNull(o.organization);
                    });
                    vm.company_preferences = _.keyBy(_data_sorted, function(o){
                        return o.organization._id;
                    });

                    let _companies_selected_fromDB = _.map(_data_sorted, function(o){
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

                let _not_selected_companies_filtered;
                if(vm.company_not_selected_search != ''){

                    _not_selected_companies_filtered = _.filter(vm.companies, function(o){
                        return o.name.toLowerCase().indexOf(vm.company_not_selected_search.toLowerCase()) >= 0;
                    })

                } else {
                    _not_selected_companies_filtered = vm.companies;
                }


                _not_selected = _.map(_not_selected_companies_filtered, function(o){
                    if(!_.includes(_selected_ids, o._id)){
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