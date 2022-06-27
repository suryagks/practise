import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BackendcallService } from 'src/app/services/backendcall.service';
import { villageDetails } from '../add-post/add-post.component';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  EventForm =  new FormGroup({
    postLocation: new FormControl (""),
    address: new FormControl (""),
    eventDescription: new FormControl (null),
    attachments: new FormControl(null),
    eventTitle: new FormControl(null),
    eventCategory: new FormControl(null),
    eventPlace: new FormControl(null),
    startDate: new FormControl(null),
    startTime: new FormControl(null),
    EndDate: new FormControl(null),
    EndTime: new FormControl(null),
  });
  fileToUpload:any;
  locations: villageDetails[];
  eventCategory:Category[]
  showSuccessMessage=false;
  showErrorMessage=false;
  FailedErrorDetails: any;
  constructor(private backendCallService: BackendcallService) {
    this.locations = [];
    this.eventCategory = [];
   }

  ngOnInit(): void {
    this.loadLocations();
    this.loadEventCategory();
  }
  loadLocations(){
    this.backendCallService.httpPost("",'/netr/village/getAllVillages?apiVersion=1').subscribe(x=> {
      if(x.internalMessage === "Village retrived successfully"){
       this.locations = x.data;
       console.log(this.locations); 
      }
       
    });
  }
  loadEventCategory(){
    this.backendCallService.httpGet('/netr/eventcategory/getEventcategory?apiVersion=1').subscribe(x=> {
      // if(x.internalMessage === "Event Category retrived successfully"){
        if(x instanceof Error) {
          console.log("Category APi Error !!")
        }
        else {
          this.eventCategory = x['data'];
        }
       console.log(this.eventCategory); 
      // }
       
    });
  }
  handleFileInput(files:any) {
    this.fileToUpload = files.files.item(0);
  }
  SaveData(){ 
    //Save Logic 
    console.log(this.fileToUpload);
    const userDetails = localStorage.getItem("user");
    const userID = userDetails != null ? JSON.parse(userDetails).userId: "";
    const formData = this.EventForm.value;
    console.log(formData);
    const dataToSendFormObj  = new FormData();
    dataToSendFormObj.append("userId", userID);
    dataToSendFormObj.append("guestIds",userID);
    dataToSendFormObj.append("versionFlag","1");
    dataToSendFormObj.append("eventTitle",formData.eventTitle);
    dataToSendFormObj.append("eventDesc",formData.eventDescription);

    let villageid = this.locations.find(x => x.villageName == formData.postLocation)?.Id
    villageid = villageid ? villageid : 0;
    dataToSendFormObj.append("villageId",formData.villageid);
    dataToSendFormObj.append("categoryId",formData.eventCategory);
    dataToSendFormObj.append("eventStartDate",formData.startDate);
    dataToSendFormObj.append("eventStartTime",formData.startTime);
    dataToSendFormObj.append("eventEndDate",formData.EndDate);
    dataToSendFormObj.append("eventEndTime",formData.EndTime);
    dataToSendFormObj.append("attachments",this.fileToUpload);
    dataToSendFormObj.append("status","1");
    this.backendCallService.httpPost(dataToSendFormObj, '/netr/event/createEvent?apiVersion=1').subscribe(x=> {
      console.log(x);
      if(x.internalMessage == 'Event created  successfully') {
        this.showSuccessMessage =  true;
        this.showErrorMessage = false;
        console.log(x);
        this.EventForm.reset();
        }
        else 
        {
          this.showErrorMessage = true;
          this.showSuccessMessage =  false;
          this.FailedErrorDetails = x;
        }
    });
  }

}
export interface CategoryData {
  data:Category[];

}
export interface Category{
  Id :	number
  category:	string
  createdAt:	number
  createdUser:	number
  updatedUser:	number
  versionFlag:	number
}