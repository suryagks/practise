import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BackendcallService } from 'src/app/services/backendcall.service';
import { Category } from '../add-event/add-event.component';
import { villageDetails } from '../add-post/add-post.component';

@Component({
  selector: 'app-add-welfare',
  templateUrl: './add-welfare.component.html',
  styleUrls: ['./add-welfare.component.scss']
})
export class AddWelfareComponent implements OnInit {

  isWelfareType =true;
  welfareType: string | undefined;
  WelfareForm = new FormGroup({
    postLocation: new FormControl (""),
    address: new FormControl(""),
    Description: new FormControl (null),
    attachments: new FormControl(null),
    firstNamae: new FormControl(null),
    lastName: new FormControl(null),
    MobileNumber: new FormControl(null),
    EmailId: new FormControl(null),
    WelfareType: new FormControl()
  });
  fileToUpload:any;
  locations: villageDetails[];
  eventCategory:Category[]
  showSuccessMessage=false;
  showErrorMessage=false;
  FailedErrorDetails: any;
  // welfaretypes: any[];
  welfareTypes: any[];
  constructor(private backendCallService: BackendcallService) {
    this.locations = [];
    this.eventCategory = [];
    this.welfareTypes = [];
   }
  ngOnInit(): void {
    this.loadLocations();
    // this.getWelfareTypes();
    this.loadWelfareType();
    this.SetDefaultData();
  }

  // setWelfareType(type : string){
  //   this.isWelfareType = false;
  //   this.welfareType = type;
  //   this.WelfareForm.controls['WelfareType'].setValue(type);
  //   this.WelfareForm.controls['WelfareType'].disable();
  //   this.SetDefaultData();
  // }
  SetDefaultData(){
    const userDetails = localStorage.getItem("user");
    const firstName = userDetails != null ? JSON.parse(userDetails).firstName : "";
    const mobileNo = userDetails != null ? JSON.parse(userDetails).mobileNo : "";
    this.WelfareForm.controls['firstNamae'].setValue(firstName);
    this.WelfareForm.controls['MobileNumber'].setValue(mobileNo);
  }
  handleFileInput(files:any) {
    this.fileToUpload = files.files.item(0);
  }


  // getWelfareTypes() {
  //   this.backendCallService.httpGet('netr/welfaretype/getWelfaretype?apiVersion=1').subscribe(x=> {
  //     if(x instanceof Error) {
  //       console.log("Welfare APi Error !! ");
  //     }
  //     else {
  //       this.welfaretypes =x.data;
  //     }
  //   });
  // }
  SaveData() {
    const formData = this.WelfareForm.value;
    
    const dataToSendFormObj = new FormData();
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
    // dataToSendFormObj.append("welfaretypeId",typeId);
    dataToSendFormObj.append("villageId",villageid.toString());
    let typeId =this.welfareTypes.find(x=>x.welfareType == formData.WelfareType)?.Id
    dataToSendFormObj.append("welfaretypeId",typeId);
    dataToSendFormObj.append("email",formData.EmailId);
    dataToSendFormObj.append("attachments",this.fileToUpload);
    dataToSendFormObj.append("amount",'0');
    this.backendCallService.httpPost(dataToSendFormObj, '/netr/welfare/createWelfare?apiVersion=1').subscribe(x=> {
      console.log(x);
      if(x.internalMessage == 'Welfare created successfully') {
        this.showSuccessMessage =  true;
        this.showErrorMessage = false;
        console.log(x);
        this.WelfareForm.reset();
        // this.setWelfareType(this.welfareType?this.welfareType:'');
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
loadWelfareType(){
  this.backendCallService.httpGet('/netr/welfaretype/getWelfaretype?apiVersion=1').subscribe(x=> {
    if(x instanceof Error) {
      console.log("Welfare APi Error !!")
    }
    else {
      this.welfareTypes = x.data;
      console.log(this.welfareTypes);
    }
  });
}

}
