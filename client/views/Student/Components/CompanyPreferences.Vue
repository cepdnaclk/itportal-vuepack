<template>
    <div class="container">
        <div class="row">
            <div class="form col-md-12 dashboard-itportal">

                <!-- Nav Tabs -->
                <ul class="nav nav-tabs z-depth-1 mt-3" role="tablist">
                    <li class="nav-item">
                        <router-link :to="{name: 'Student_dashboard_tasks'}" exact class="nav-link with-icon flex-center"><i class="material-icons">arrow_back</i>Back</router-link>
                    </li>
                    <li>
                        <h4 class="section-title">Set your company preferences</h4>
                    </li>
                </ul>

                <div class="tab-content card mb-3 child-view-dash-container">

                    <hr class="my-1">
                    <div class="container companies-selected">
                        <h5 class="my-1">Liked Companies</h5>
                        <transition-group name="component-fade" mode="out-in">
                            <div v-for="(company, index) in companies_selected"
                                :key="company"
                                class="company-selected"
                                :class="{active: index==activeSlot}"
                                @click="setActiveSlot(index)"
                                >

                                <span class="preference">{{index + 1}}</span>
                                <img src="/img/user.png" alt="" class="image">
                                <span class="company">{{company}}</span>
                                <div class="remove" v-show="company" @click="removeSelected(company)">
                                    <span>X</span>
                                </div>
                            </div >
                        </transition-group>
                    </div>
                    <hr class="my-1">
                    <div class="container companies-not-selected">

                        <h5 class="my-1">Other Companies</h5>
                        <p>Choose the company for the selected slot above from the following list</p>
                        <!-- <transition-group name="component-fade" mode="out-in"> -->
                        	<div v-for="company in sorted_notSelected" 
                            :id="company"
                            :key="company"
                            @click="addSelected(company)"
                            class="company-not-selected">
                                <img src="/img/user.png" alt="" class="image">
                                <span class="company">{{company}}</span>
                            </div >
                        <!-- </transition-group> -->
                    </div>
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
            background: #f34;
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
        transition: all .2s ease;
        width: 300px;
        transform: scale(1,1);
    }
    .component-fade-enter, .component-fade-leave-to{
        width: 0px;
        transform: scale(0,0);
        opacity: 0;
    }
</style>

<script>
    import Vue from 'vue';
    import restconfig from 'config/rest';
    import _ from 'lodash';


    export default {
        data(){
            return {
                state: this.$store.state,
                user: Vue.auth.getUser(),
                restbaseurl: restconfig.url,

                companies: [
                    'caper caper co.',
                    'quambo quambo co.',
                    'disent disent co.',
                    'subicious subicious co.',
                    'polyoid polyoid co.',
                    'twiva twiva co.',
                    'fafix fafix co.',
                    'camizz camizz co.',
                    'verend verend co.',
                    'metaloo metaloo co.',
                    'omninu omninu co.',
                    'supore supore co.',
                    'esor esor co.',
                    'duonix duonix co.',
                    'planti planti co.',
                    'execundu execundu co.',
                    'trilium trilium co.',
                    'yonte yonte co.',
                    'suprajo suprajo co.',
                    'dynape dynape co.',
                    'panous panous co.',
                    'socixo socixo co.',
                    'centiveo centiveo co.',
                    'jamia jamia co.',
                    'astroxo astroxo co.',
                    'skyose skyose co.',
                    'colium colium co.',
                    'transic transic co.',
                    'corandu corandu co.',
                    'equva equva co.',
                    'sugill sugill co.',
                    'sucer sucer co.',
                    'eanyx eanyx co.',
                    'mident mident co.',
                    'diadel diadel co.',
                    'hydrolium hydrolium co.',
                    'cerver cerver co.',
                    'difism difism co.',
                ],
                companies_selected: [''],
                activeSlot: 0,
            }
        },
        methods: {
            addSelected: function(company){
                this.companies.splice(this.companies.indexOf(company), 1);
                this.companies_selected.splice(this.activeSlot, 0, company);

                this.activeSlot++;
            },
            removeSelected: function(company){
                this.companies.push(company);
                this.companies_selected.splice(this.companies_selected.indexOf(company), 1);

                this.activeSlot--;
            },
            setActiveSlot: function(index){
                this.activeSlot = index;
            }
        },
        computed: {
            sorted_notSelected:function(){
                return _.sortBy(this.companies, [function(o) { return o; }]);
            }
        }
}
</script>