import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import _ from 'lodash'

import Home from '../views/Home'

import Auth from '../views/Auth'
import Login from '../views/Auth/Login'
import Signup from '../views/Auth/Signup'

import Dashboard from '../views/Auth/SelectAccount'
import DashboardConfirm from '../views/Auth/ConfirmEmail'
import StudentDashboard from '../views/Student/Dashboard'
import OrganizationDashboard from '../views/Organization/Dashboard'
import StaffDashboard from '../views/Staff/Dashboard'
import AdminDashboard from '../views/Admin/Dashboard'

import AdminDashboard_Summary from '../views/Admin/Components/Summary'
import AdminDashboard_ContentEditor from '../views/Admin/Components/ContentEditor'
import AdminDashboard_Entities from '../views/Admin/Components/Entities'
import AdminDashboard_RoutesControl from '../views/Admin/Components/RoutesControl'
import AdminDashboard_StudentAllocation from '../views/Admin/Components/StudentAllocation'
import AdminDashboard_Tasks from '../views/Admin/Components/Tasks'
import AdminDashboard_Timeline from '../views/Admin/Components/Timeline'
import AdminDashboard_UserEvents from '../views/Admin/Components/UserEvents'
import AdminDashboard_Settings from '../views/Admin/Components/Settings'

import StudentDashboard_Summary from '../views/Student/Components/Summary'
import StudentDashboard_Tasks from '../views/Student/Components/Tasks'
import StudentDashboard_DecisionDesk from '../views/Student/Components/DecisionDesk'
import StudentDashboard_EditProfile from '../views/Student/Components/EditProfile'
import StudentDashboard_Settings from '../views/Student/Components/Settings'
import StudentDashboard_CompanyPreferences from '../views/Student/Components/CompanyPreferences'

import OrganizationDashboard_Summary from '../views/Organization/Components/Summary'
import OrganizationDashboard_Tasks from '../views/Organization/Components/Tasks'
import OrganizationDashboard_DecisionDesk from '../views/Organization/Components/DecisionDesk'
import OrganizationDashboard_EditProfile from '../views/Organization/Components/EditProfile'
import OrganizationDashboard_EditCompany from '../views/Organization/Components/EditCompany'
import OrganizationDashboard_Settings from '../views/Organization/Components/Settings'

import OrganizationDashboard_EditCompany_create from '../views/Organization/Components/EditCompany/Create'
import OrganizationDashboard_EditCompany_join from '../views/Organization/Components/EditCompany/Join'


import GettingStarted from '../views/Misc/GettingStarted'
import AllStudents from '../views/Misc/AllStudents'
import AllOrganizations from '../views/Misc/AllOrganizations'
import NotImplemented from '../views/Misc/NotImplemented'

import ProfileStudent from '../views/Misc/ViewProfileStudent'
import ProfileCompany from '../views/Misc/ViewProfileCompany'
import ProfileCompanyRep from '../views/Misc/ViewProfileCompanyRep'


Vue.use(Router)
Vue.use(VueAxios, axios)

Vue.axios.interceptors.request.use((config) => {
    var token = Vue.auth.getToken();

    if (token) {
        config.headers['authorization'] = 'Bearer ' + token;
    }

    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    config.headers['Expires'] = '-1';
    config.headers['Cache-Control'] = "no-cache,no-store,must-revalidate,max-age=-1,private";

    return config;

});

var router = new Router({
    mode: 'history',
    root: '/',
    routes: [{
            path: '/',
            name: 'Home',
            component: Home,
        }, {
            path: '/all/students',
            component: AllStudents,
            // meta: {
            //     auth: true
            // },
            exact: true
        }, {
            path: '/all/organizations',
            component: AllOrganizations,
            // meta: {
            //     auth: true
            // },
            exact: true
        },{
            path: '/profile/student/:id',
            component: ProfileStudent,
            props: true,
            exact: true
        },{
            path: '/profile/organization/:id',
            component: ProfileCompany,
            props: true,
            exact: true
        },{
            path: '/profile/organizationRepresentative/:id',
            component: ProfileCompanyRep,
            props: true,
            exact: true
        }, {
            path: '/gettingstarted',
            component: GettingStarted
        }, {
            path: '/auth',
            component: Auth,
            children: [{
                name: 'Auth_login',
                path: 'login',
                component: Login,
                meta: {
                    auth: false
                }
            }, {
                name: 'Auth_signup',
                path: 'signup',
                component: Signup,
                meta: {
                    auth: false
                }
            }, {
                path: '*',
                redirect: '/auth/login'
            }]
        },


        {
            path: '/dashboard/confirm/:token',
            component: DashboardConfirm,
            name: 'Auth_confirm_dashboard',
            meta: {
                auth: true
            },
            props: true
        },
        {
            path: '/dashboard',
            component: Dashboard,
            name: 'Auth_select_dashboard',
            meta: {
                auth: true
            },
            beforeEnter: (to, from, next) => {

                let _role = Vue.auth.getRoles();
                if(_.isArray(_role) && _role.length > 1){
                    next()
                } else {
                    if(_.isEqual(_role[0], 'STUDENT')){ next({name: 'Student_dashboard_summary'}) }
                    else if(_.isEqual(_role[0], 'COMPANY')){ next({name: 'Organization_dashboard_summary'}) }
                    else if(_.isEqual(_role[0], 'STAFF')){ next({name: 'Staff_dashboard'}) }
                    else if(_.isEqual(_role[0], 'ADMIN')){ next({name: 'Admin_dashboard_summary'}) }
                    else{ console.log('_role', _role); next() }
                }

            }
        }, {
            path: '/student',
            component: StudentDashboard,
            name: 'Student_dashboard',
            meta: {
                auth: true
            },
            children: [
                {name: 'Student_dashboard_summary', path: '', component: StudentDashboard_Summary },
                {name: 'Student_dashboard_tasks', path: 'tasks', component: StudentDashboard_Tasks },
                {name: 'Student_dashboard_editprofile', path: 'editprofile', component: StudentDashboard_EditProfile },
                {name: 'Student_dashboard_settings', path: 'settings', component: StudentDashboard_Settings },
                {name: 'Student_dashboard_companyPreferences', path: 'company', component: StudentDashboard_CompanyPreferences },
                {name: 'Student_dashboard_decisiondesk', path: 'decisiondesk', component: StudentDashboard_DecisionDesk },
            ]
        }, {
            path: '/organization',
            component: OrganizationDashboard,
            name: 'Organization_dashboard',
            meta: {
                auth: true
            },
            children: [
                {name: 'Organization_dashboard_summary', path: '', component: OrganizationDashboard_Summary },
                {name: 'Organization_dashboard_tasks', path: 'tasks', component: OrganizationDashboard_Tasks },
                {name: 'Organization_dashboard_decisiondesk', path: 'decisiondesk', component: OrganizationDashboard_DecisionDesk },
                {name: 'Organization_dashboard_editprofile', path: 'editprofile', component: OrganizationDashboard_EditProfile },
                {name: 'Organization_dashboard_editcompany', path: 'editcompany', component: OrganizationDashboard_EditCompany,
                    children: [
                        {name: 'Organization_dashboard_editcompany_create', path: 'create', component: OrganizationDashboard_EditCompany_create },
                        {name: 'Organization_dashboard_editcompany_join', path: 'join', component: OrganizationDashboard_EditCompany_join },
                        {name: 'Organization_dashboard_editcompany_edit', path: 'edit', component: NotImplemented }
                    ]
                 },
                {name: 'Organization_dashboard_settings', path: 'settings', component: OrganizationDashboard_Settings },
            ]
        }, {
            path: '/staff',
            component: StaffDashboard,
            name: 'Staff_dashboard',
            meta: {
                auth: true
            }
        }, {
            path: '/admin',
            component: AdminDashboard,
            name: 'Admin_dashboard',
            meta: {
                auth: true
            },

            children: [
                {name: 'Admin_dashboard_summary', path: '', component: AdminDashboard_Summary },
                {name: 'Admin_dashboard_ContentEditor', path: 'contentEditor', component: AdminDashboard_ContentEditor },
                {name: 'Admin_dashboard_Entities', path: 'entites', component: AdminDashboard_Entities },
                {name: 'Admin_dashboard_Routes', path: 'routes', component: AdminDashboard_RoutesControl },
                {name: 'Admin_dashboard_StudentAllocation', path: 'studentAllocation', component: AdminDashboard_StudentAllocation },
                {name: 'Admin_dashboard_Tasks', path: 'tasks', component: AdminDashboard_Tasks },
                {name: 'Admin_dashboard_Timeline', path: 'timeline', component: AdminDashboard_Timeline },
                {name: 'Admin_dashboard_UserEvents', path: 'userEvents', component: AdminDashboard_UserEvents },
                {name: 'Admin_dashboard_Settings', path: 'settings', component: AdminDashboard_Settings }
            ]
        },

    ],
    linkActiveClass: 'active'
});

router.beforeEach((to, from, next) => {
    
    var _loggedIn = Vue.auth.loggedIn();
    var _metaAuth = to.meta.auth;

    if (_loggedIn && (_metaAuth === false)) {
        next({
            name: 'Auth_select_dashboard'
        });
    } else if (!_loggedIn && (_metaAuth === true)) {
        next({
            name: 'Auth_login'
        });
    }
    next();

})
export default router;