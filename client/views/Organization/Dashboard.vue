<template>
    <div class="container">
        <div class="row">
            <div class="form col-md-12 dashboard-itportal">

                <!-- Nav Tabs -->
                <ul class="nav nav-tabs z-depth-1 mt-3" role="tablist">
                    <li class="nav-item">
                        <router-link :to="{name: 'Organization_dashboard_summary'}" exact class="nav-link with-icon flex-center"><i class="material-icons">multiline_chart</i>Dashboard</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name: 'Organization_dashboard_tasks'}" class="nav-link with-icon flex-center"><i class="material-icons">list</i> Tasks</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name: 'Organization_dashboard_decisiondesk'}" class="nav-link with-icon flex-center"><i class="material-icons">thumbs_up_down</i> Decision Desk</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name: 'Organization_dashboard_editprofile'}" class="nav-link with-icon flex-center"><i class="material-icons">assignment_ind</i>My Profile</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name: 'Organization_dashboard_editcompany'}" class="nav-link with-icon flex-center"><i class="material-icons">business</i>My Company</router-link>
                    </li>
                    <li class="nav-item">
	                    <router-link :to="{name: 'Organization_dashboard_settings'}" class="nav-link with-icon flex-center"><i class="material-icons">settings</i>Settings</router-link>
                    </li>
                </ul>

                <div class="tab-content card mb-3 child-view-dash-container">
                	<transition name="slide-left" mode="out-in">
                    <router-view class="child-view-dash"></router-view>
                    </transition>
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
