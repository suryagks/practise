import { LivetvComponent } from './livetv/livetv.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/AuthService/auth.guard';
import { BanneruploadComponent } from './bannerupload/bannerupload.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { UserspostsComponent } from './usersposts/usersposts.component';
import { ExtractEventsComponent } from './ExtractEvents/ExtractEvents.component';
import { YoutubeuploadComponent } from './youtubeupload/youtubeupload.component';
import { AddPostComponent } from './add-post/add-post.component';
import { AddEventComponent } from './add-event/add-event.component';
import { AddComplaintComponent } from './add-complaint/add-complaint.component';
import { ComplaintstatusComponent } from './complaintstatus/complaintstatus.component';
import { WelfarestatusComponent } from './welfarestatus/welfarestatus.component';
import { AddWelfareComponent } from './add-welfare/add-welfare.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { BloodComponent } from './blood/blood.component';


const routes: Routes = [
  {path:'uploadbanners', component:BanneruploadComponent, canActivate:[AuthGuard]},
  {path:'youtubeupload', component:YoutubeuploadComponent, canActivate:[AuthGuard]},
  {path:'extractEvent', component:ExtractEventsComponent,canActivate:[AuthGuard]},
  {path:'reviewpost', component:UserspostsComponent, data:{value:2}},
  {path:'rereviewdeclinedpost', component:UserspostsComponent, data:{value:3}},
  {path:'postdetails', component: PostDetailsComponent},
  {path:'addpost',component: AddPostComponent},
  {path:'addevent',component: AddEventComponent},
  {path:'addcomplaint',component: AddComplaintComponent},
  {path:'complaintstatus',component: ComplaintstatusComponent},
  {path: 'welfarestatus',component:WelfarestatusComponent},
  {path: 'addwelfare',component:AddWelfareComponent},
  {path: 'updateprofile',component:UpdateprofileComponent},
  {path: 'userdetails', component:UserDetailsComponent},
  {path: '',component:YoutubeuploadComponent},
  {path:'livetv',component:LivetvComponent},
  {path: 'blood', component:BloodComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
