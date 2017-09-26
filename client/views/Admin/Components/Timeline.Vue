<template>
	<div>
		<div class="fluid-container white lighten-5 p-2">
			<h4>Interviews</h4>
			<div>
				<table class="table table-sm">
					<tr>
						<th>Interview Date</th>
						<th colspan="2">Student</th>
						<th colspan="2">Company</th>
						<th>Updated on</th>
						<th>Description</th>
					</tr>
					<tr v-for="interview in interviews">
						<td class="align-middle">{{interview.date}} {{interview.time}}</td>
						<td class="align-middle"><img class="rounded-circle" :src="interview.student.photo ? (restUrl + 'photo/user/small-' + interview.student.photo) : '/img/user.png'" style="height: 3em; width: 3em; border-radius: 3em; width: 3em" alt=""/></td>
						<td class="align-middle">{{interview.student.name}}</td>
						<td class="align-middle"><img class="rounded-circle" :src="interview.company.photo ? (restUrl + 'photo/organization/small-' + interview.company.photo) : '/img/company.png'" style="height: 3em; width: 3em; border-radius: 3em; width: 3em" alt=""/></td>
						<td class="align-middle">{{interview.company.name}}</td>
						<td class="faded small">{{interview.createdAt}}</td>
						<td class="faded small">
						<span class="text-primary">{{interview.type}}</span> <br>
						{{interview.type_other}}
						</td>
					</tr>
				</table>
			</div>
		</div>
		<div class="fluid-container white lighten-5 p-2">
			<h4>Timeline</h4>
			<div>
				<table class="table table-sm">
					<tr>
						<th>Time</th>
						<th>Event</th>
						<th>User</th>
					</tr>
					<tr v-for="log in logs">	
						<td>{{moment(log.createdAt)}}</td>
						<td>{{log.type}}</td>
						<td>{{(log.user)?log.user.email:''}}</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>

<style scoped>
.story-feed{
    border-right: solid thin #eee;
}
.ct-series-a .ct-area {
    fill: #ff6500 !important;
    fill-opacity: 0.4 !important;
}
.ct-series-b {
    fill: #f34;
}
    
</style>

<script>
	
import Vue from 'vue';
import store from 'store';
import Chartist from 'chartist'

export default {
	data: ()=>{
		return {
			logs: [],
			interviews: [],
			restUrl: Vue.rest.restBaseUrl,
		}
	},
	methods: {
		getAllData: function(){
			let vm = this;
			let _baseUrl = Vue.rest.restBaseUrl;

			store.dispatch('showLoader', 'Retrieving timeline..');

			Vue.axios.get(_baseUrl + 'api/admin/logs')
			.then(function(res){
				console.log('[Admin][Logging]' ,res.data)
				vm.logs = res.data;

				store.dispatch('hideLoader');
			})
			.catch(function(err){console.log(err)})


			store.dispatch('showLoader', 'Retrieving interviews..');
			Vue.axios.get(_baseUrl + 'api/admin/interviews')
			.then(function(res){
				console.log('[Admin][Interviews]' ,res.data)

				let _interviews = res.data;

				vm.interviews = _.filter(_interviews, function(o){
					return !_.isNull(o.company);
				});

				store.dispatch('hideLoader');
			})
			.catch(function(err){console.log(err)})
		},
        moment: function(date){
            return moment(date).calendar();
        },
        drawGraphs: function(){

            var chart = new Chartist.Line('.ct-chart', {
                labels: _.map(_labels, function(value, key){ return key}),
                // Naming the series with the series object array notation
                series: [{
                    name: 'series-1',
                    data: _.map(_records_profile_views, function(value, key){ return value})
                },{
                    name: 'series-2',
                    data: _.map(_last_updated, function(value, key){ return value})
                }]
            }, {
                showPoint: false,
                showLine: false,
                showArea: true,
                fullWidth: true,
                showLabel: false,
                axisX: {
                    labelInterpolationFnc: function skipLabels(value, index) {
                        return (index % Math.ceil(_.size(_labels)/10))  === 0 ? value : null;
                    },
                    showGrid: true,
                    showLabel: true,
                    offset: 30
                },
                axisY: {
                    showGrid: false,
                    showLabel: true,
                    offset: 30
                },
                chartPadding: 0,
                low: 0,
                // Within the series options you can use the series names
                // to specify configuration that will only be used for the
                // specific series.
                series: {
                    'series-1': {
                        lineSmooth: Chartist.Interpolation.simple()
                    },
                    'series-2': {
                        lineSmooth: Chartist.Interpolation.simple(),
                        showArea: false,
                        showPoint: true
                    },
                    'series-3': {
                        showPoint: false
                    }
                }
            }, [
                // You can even use responsive configuration overrides to
                // customize your series configuration even further!
                ['screen and (max-width: 320px)', {
                    series: {
                        'series-1': {
                            lineSmooth: Chartist.Interpolation.none()
                        },
                        'series-2': {
                            lineSmooth: Chartist.Interpolation.none(),
                            showArea: false
                        },
                        'series-3': {
                            lineSmooth: Chartist.Interpolation.none(),
                            showPoint: true
                        }
                    }
                }]
            ]);
        }
	},
	mounted: function(){
		this.getAllData();
	}
}
</script>