<template>
<div class="tab-pane active">
    
    <div class="card-block">
        <!--Body-->
        <div class="row">
            <div class="col-md-12 container px-3">
                <h2 class="h2-responsive">Todo</h2>
				<hr class="my-1 mb-2">
				<div class="align-self-center">
					<router-link to="/organization/editcompany" tag="span" class="btn btn-primary col-sm-3">Create Company Profile</router-link>
					<span class="d-inline-block">Create a brand new profile for your company on ITPortal</span>
				</div>
				<div class="align-self-center">
					<router-link to="/organization/editcompany" tag="span" class="btn btn-primary col-sm-3">Join Company</router-link>
					<span class="d-inline-block">Join an existing company on ITPortal</span>
				</div>
				<hr class="mt-2">
            </div>
            
        </div>
    </div>
</div>
</template>
