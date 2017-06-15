<template>

<div class="fluid-container p-2">
	<h3 class="h3-responsive p-1 py-2">Admin Dashboard</h3>
    <div class="row">
        <div class="form col-md-12 dashboard-itportal">

            <!-- Nav Tabs -->
            <ul class="nav nav-tabs z-depth-1" role="tablist">
                <li class="nav-item">
                    <router-link :to="{name: 'Admin_dashboard_summary'}" exact class="nav-link with-icon flex-center"><i class="material-icons">multiline_chart</i>Dashboard</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{name: 'Admin_dashboard_Tasks'}" exact class="nav-link with-icon flex-center"><i class="material-icons">list</i>Tasks</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{name: 'Admin_dashboard_StudentAllocation'}" exact class="nav-link with-icon flex-center"><i class="material-icons">supervisor_account</i>Student Allocation</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{name: 'Admin_dashboard_UserEvents'}" exact class="nav-link with-icon flex-center"><i class="material-icons">event</i>User Events</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{name: 'Admin_dashboard_Timeline'}" exact class="nav-link with-icon flex-center"><i class="material-icons">history</i>Timeline</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{name: 'Admin_dashboard_UserEditor'}" exact class="nav-link with-icon flex-center"><i class="material-icons">edit</i>User Editor</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{name: 'Admin_dashboard_Entities'}" exact class="nav-link with-icon flex-center"><i class="material-icons">edit</i>Entity Editor</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{name: 'Admin_dashboard_ContentEditor'}" exact class="nav-link with-icon flex-center"><i class="material-icons">edit</i>Content Editor</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{name: 'Admin_dashboard_Settings'}" exact class="nav-link with-icon flex-center"><i class="material-icons">settings</i>Settings</router-link>
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
.nav-link{
    font-size: small;
}
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