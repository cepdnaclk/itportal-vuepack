<template>
<div class="tab-pane active">
    
    <div class="card-block">
        <!--Body-->
        <div class="row">
            <div class="col-md-12 container px-3">
                <h2 class="h2-responsive">Todo</h2>
				<hr class="my-1 mb-2">
				<div class="align-self-center">
					<router-link :to="{name: 'Student_dashboard_companyPreferences'}" tag="span" class="btn btn-primary col-sm-3">Set Preferences</router-link>
					<span class="d-inline-block">Set your preferences for companies</span>
				</div>
				<br>
				<div class="align-self-center">
					<span class="btn btn-primary col-sm-3">View Interviews</span>
					<span class="d-inline-block">Manage your interviews</span>
				</div>
				<hr class="mt-2">
            </div>
            
        </div>
    </div>
</div>
</template>
