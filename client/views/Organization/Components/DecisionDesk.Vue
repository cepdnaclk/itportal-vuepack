<template>
<div class="tab-pane active">
    
    <div class="card-block">
        <!--Body-->
        <div class="row">
            <div class="col-md-12 container px-3">
                <h2 class="h2-responsive">Decision Desk</h2>
                <div class="container blue-grey lighten-5 py-2">
                    <div class="row decision-header mb-2">
                        <div class="col-md-7">Students <span class="text-uppercase small">(12 Students)</span></div>
                        <div class="col-md-1">Viewed <span class="text-uppercase small">(12)</span></div>
                        <div class="col-md-1">Interview Scheduled <span class="text-uppercase small">(12)</span></div>
                        <div class="col-md-1">Accepted <span class="text-uppercase small">(12)</span></div>
                        <div class="col-md-2">Actions <span class="text-uppercase small">(12)</span></div>
                    </div>
                    <div class="container decision-student white z-depth-1 p-2 my-1">
                        <div class="row">
                            <div class="col-md-7 student-details">
                                <img class="rounded-circle" src="/img/user.png" alt="">
                                <div class="name">Ishan Madhusanka</div>
                                <div class="desc">
                                    <span class="title">GPA</span>
                                    <span class="content">3.4</span>
                                </div>
                                <div class="desc">
                                    <span class="title">Favourite</span>
                                    <span class="content">Javascript</span>
                                </div>
                                
                            </div>
                            <div class="col-md-1"><span class="dot"></span></div>
                            <div class="col-md-1"><span class="dot"></span></div>
                            <div class="col-md-1"><span class="dot"></span></div>
                            <div class="col-md-2 actions">
                                <div class="btn btn-primary btn-sm btn-block">View</div>
                                <div class="btn btn-primary btn-sm btn-block">Inverview</div>
                                <div class="btn btn-primary btn-sm btn-block">Accept</div>
                            </div>
                        </div>

                    </div>
                </div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore aperiam aut iusto quae error tempore nisi consequuntur natus magni fugiat illum, repellat minima quibusdam aliquam dolor deserunt repudiandae quas, laboriosam.
				<hr class="mt-2">
            </div>
            
        </div>
    </div>
</div>
</template>

<style scoped>
    .decision-header{
        line-height: 1;

        .span{
            display: block;
        }
    }
    .decision-student{

        .student-details{
            
            *{
                display: inline-block;
            }
            img{
                display: inline-block;
            }
            @media screen and (min-width: 480px) {
               img{
                    height: 60px;
                }
            }
            .name{
                font-size: large;
            }
            .desc{
                position: relative;
                top: 50%;
                transform: translateY(-50%);
                display: flex;
                flex-direction: column;
                float: right;
                text-align: center;
                margin-left: 10px;

                .title{
                    font-size: small;
                }
                .content{
                    text-transform: uppercase;

                }
            }
        }

        .decision-student{

        }
    }
</style>
