<template>
<div class="tab-pane active">
    
    <div class="card-block">
        <!--Body-->
        <div class="row">
            <div class="col-md-12 container px-3">
                <h2 class="h2-responsive">Student Decision Desk</h2>
                
              	<view-offers></view-offers>
                <view-interviews></view-interviews>
                <company-preferences></company-preferences>
            </div>
        </div>
    </div>
</div>
</template>

<script>
   

import CompanyPreferences from './CompanyPreferences';
import ViewInterviews from './ViewInterviews';
import ViewOffers from './ViewOffers';

export default {
	components: {
        CompanyPreferences,
        ViewInterviews,
		ViewOffers
	}
}
</script>