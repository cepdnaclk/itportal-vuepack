<template>
<div class="tab-pane active">
    
    <div class="card-block">
        <!--Body-->
        <div class="row">
            <div class="col-md-12 container px-3">
                <h2 class="h2-responsive">Student Decision Desk</h2>
                
                <company-preferences></company-preferences>
              	<view-interviews></view-interviews>
            </div>
        </div>
    </div>
</div>
</template>

<script>
   

import CompanyPreferences from './CompanyPreferences';
import ViewInterviews from './ViewInterviews';

export default {
	components: {
        CompanyPreferences,
		ViewInterviews
	}
}
</script>