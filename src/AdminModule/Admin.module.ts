import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/shared/shared.module';

import { AdminRoutingModule } from './AdminRoutingModule.module';
import { UserspostsComponent } from './usersposts/usersposts.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { ExtractEventsComponent } from './ExtractEvents/ExtractEvents.component';
import { YoutubeuploadComponent } from './youtubeupload/youtubeupload.component';
import { BanneruploadComponent } from './bannerupload/bannerupload.component';
import { AddPostComponent } from './add-post/add-post.component';
import { AddEventComponent } from './add-event/add-event.component';
import { AddComplaintComponent } from './add-complaint/add-complaint.component';
import { ComplaintstatusComponent } from './complaintstatus/complaintstatus.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { WelfarestatusComponent } from './welfarestatus/welfarestatus.component';
import { AddWelfareComponent } from './add-welfare/add-welfare.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';




@NgModule({
  declarations: [
    UserspostsComponent,
    PostDetailsComponent,
    ExtractEventsComponent,
    YoutubeuploadComponent,
    BanneruploadComponent,
    AddPostComponent,
    AddEventComponent,
    AddComplaintComponent,
    ComplaintstatusComponent,
    WelfarestatusComponent,
    AddWelfareComponent,
    UpdateprofileComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    NgCircleProgressModule.forRoot(),
  ]
})
export class AdminModule { }
