import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BackendcallService } from 'src/app/services/backendcall.service';
import { Category } from '../add-event/add-event.component';
import { villageDetails } from '../add-post/add-post.component';

@Component({
  selector: 'app-add-complaint',
  templateUrl: './add-complaint.component.html',
  styleUrls: ['./add-complaint.component.scss']
})
export class AddComplaintComponent implements OnInit {

  isComplaintType =true;
  complaintType: string | undefined;
  ComplaintForm =  new FormGroup({
    postLocation: new FormControl (""),
    address: new FormControl (""),
    Description: new FormControl (null),
    attachments: new FormControl(null),
    firstNamae: new FormControl(null),
    lastName: new FormControl(null),
    MobileNumber: new FormControl(null),
    EmailId: new FormControl(null),
    ComplaintType: new FormControl(null)
  });
  fileToUpload:any;
  locations: villageDetails[];
  eventCategory:Category[]
  showSuccessMessage=false;
  showErrorMessage=false;
  FailedErrorDetails: any;
  complainttypes: any[];
  constructor(private backendCallService: BackendcallService) {
    this.locations = [];
    this.eventCategory = [];
    this.complainttypes = [];
   }

  ngOnInit(): void {
    this.loadLocations();
    this.getComplaintTypes();
  }
  setComplaintType(type : string){
    this.isComplaintType = false;
    this.complaintType = type;
    this.ComplaintForm.controls['ComplaintType'].setValue(type);
    this.ComplaintForm.controls['ComplaintType'].disable();
    this.SetDefaultData();
  }
  SetDefaultData() {
    const userDetails = localStorage.getItem("user");
    const firstName = userDetails != null ? JSON.parse(userDetails).firstName : "";
    const mobileNo = userDetails != null ? JSON.parse(userDetails).mobileNo : "";
    this.ComplaintForm.controls['firstNamae'].setValue(firstName);
    this.ComplaintForm.controls['MobileNumber'].setValue(mobileNo);
  }
  handleFileInput(files:any) {
    this.fileToUpload = files.files.item(0);
  }
  getComplaintTypes(){
    this.backendCallService.httpGet('/netr/complaint/getTypes?apiVersion=1').subscribe(x=> {
      if(x instanceof Error) {
        console.log("Complaint APi Error !!")
      }
      else {
        this.complainttypes = x.data;
      }
      
    });
  }
  SaveData(){
    const formData = this.ComplaintForm.value;
    let typeId = this.complainttypes.find(x => x.type == this.complaintType)?.Id
    const dataToSendFormObj  = new FormData();
    const userDetails = localStorage.getItem("user");
    const userID = userDetails != null ? JSON.parse(userDetails).userId: "";
    dataToSendFormObj.append("userId",userID);
    dataToSendFormObj.append("versionFlag","1");
    dataToSendFormObj.append("firstName",formData.firstNamae);
    dataToSendFormObj.append("lastName",formData.lastName);
    dataToSendFormObj.append("address",formData.address);
    dataToSendFormObj.append("mobileNo",formData.MobileNumber);
    let villageid = this.locations.find(x => x.villageName == formData.postLocation)?.Id
    villageid = villageid ? villageid : 0;
    dataToSendFormObj.append("complaintTypeId",typeId);
    dataToSendFormObj.append("villageId",villageid.toString());
    dataToSendFormObj.append("email",formData.EmailId);
    dataToSendFormObj.append("attachments",this.fileToUpload);

    this.backendCallService.httpPost(dataToSendFormObj, '/netr/complaint/createComplaint?apiVersion=1').subscribe(x=> {
      console.log(x);
      if(x.internalMessage == 'Complaint record saved') {
        this.showSuccessMessage =  true;
        this.showErrorMessage = false;
        console.log(x);
        this.ComplaintForm.reset();
        this.setComplaintType(this.complaintType?this.complaintType:'');
        }
        else 
        {
          this.showErrorMessage = true;
          this.showSuccessMessage =  false;
          this.FailedErrorDetails = x;
        }
    });
  }
  loadLocations(){
    this.backendCallService.httpPost("",'/netr/village/getAllVillages?apiVersion=1').subscribe(x=> {
      if(x.internalMessage === "Village retrived successfully"){
       this.locations = x.data;
       console.log(this.locations); 
      }
       
    });
  }

}
