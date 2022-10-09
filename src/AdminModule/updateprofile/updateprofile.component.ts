import { Component, OnInit } from '@angular/core';
import { BackendcallService } from 'src/app/services/backendcall.service';
import { villageDetails } from '../add-post/add-post.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.scss']
})
export class UpdateprofileComponent implements OnInit {
  UpdateForm = new FormGroup({
    postLocation: new FormControl(""),
    address:new FormControl(""),
    Mobileno: new FormControl(""),
    Emailid: new FormControl(""),
    Lastname: new FormControl(""),
    Firstname: new FormControl(""),
    startDate: new FormControl(""),
    genderLocation: new FormControl(""),
    oldpic:new FormControl("")
  });
  fileToUpload:any;
  locations:villageDetails[];
  gender: string | undefined;
  showSuccessMessage=false;
  showErrorMessage=false;
  FailedErrorDetails: any;
  buttonText: string | undefined;
  deleteSuccess: boolean = false;
  ifError: boolean = false;
  tableData: any;
  profilepicture = "";

  constructor(private backendCallService: BackendcallService) {
    this.locations =[];

   }

  ngOnInit(): void {
    this.loadLocations();
    this.getAllDetails();
    this.updateDetails();
    this.GetMyData();
  }
  updateDetails(){
    this.backendCallService.httpPost("",'')
  }

  loadLocations(){
    this.backendCallService.httpPost("",'/netr/village/getAllVillages?apiVersion=1').subscribe(x=> {
      if(x.internalMessage === "Village retrived successfully"){
       this.locations = x.data;
       console.log(this.locations); 
      }
       
    });
  }
  getAllDetails() {
    this.backendCallService.httpGet("/netr/adds/getAllActiveAdds?apiVersion=1").subscribe((x:any)=> {
      if(x instanceof Error) {
        this.ifError = true;
      }
      else {
        this.tableData = x['data'];
      }
  });
  }
 ConfirmSaveData(){
  if (confirm("Are you sure you want to update ?") == true) {
    this.SaveData();
  }
 }
 SaveData(){
  console.log(this.fileToUpload);
  const userDetails = localStorage.getItem("user");
  const userID = userDetails != null ? JSON.parse(userDetails).userId: "";
  if(this.fileToUpload){
    const imageData  = new FormData();
    imageData.append("profilePic",this.fileToUpload);
    imageData.append("userId",userID);
    this.backendCallService.httpPost(imageData,`/netr/profile/updateProfilePic?apiVersion=1`).subscribe(x=>{
  });
   }
  
  const formData = this.UpdateForm.value;
  console.log(formData);
    const dataToSendFormObj  = new FormData();
    dataToSendFormObj.append("userId", userID);
    dataToSendFormObj.append("mobileNo", formData.Mobileno);
    dataToSendFormObj.append("firstName", formData.Firstname);
    dataToSendFormObj.append("lastName", formData.Lastname);
    dataToSendFormObj.append("gender", formData.genderLocation);
    dataToSendFormObj.append("dob", formData.startDate);
    dataToSendFormObj.append("address", formData.address);
    dataToSendFormObj.append("email", formData.Emailid);
    dataToSendFormObj.append("otherPic",formData.oldpic);
    let villageid = this.locations.find(x => x.villageName == formData.postLocation)?.Id
    villageid = villageid ? villageid : 0;
    dataToSendFormObj.append("villageId",villageid.toString());
    this.backendCallService.httpPost(dataToSendFormObj,`/netr/profile/updateProfile?apiVersion=1`).subscribe((x:any) => {
      if(x instanceof Error) {
        this.showErrorMessage = true;
        this.showSuccessMessage =  false;
        this.FailedErrorDetails = x;
      }
      else{
        this.showSuccessMessage =  true;
           this.showErrorMessage = false;
           window.location.reload();
      }
    });
  
 }
 deleteUser(){
  const userDetails = localStorage.getItem("user");
  const userID = userDetails != null ? JSON.parse(userDetails).userId: "";
  if (confirm("Are you sure you want to Delete ?") == true) {
    const dataToSendFormObj = {"userId":userID};
    this.backendCallService.httpPost(dataToSendFormObj,`/netr/auth/deleteUser`).subscribe((x:any) => {
      if(x instanceof Error) {
        this.showErrorMessage = true;
        this.showSuccessMessage =  false;
        this.FailedErrorDetails = x;
      }
      else{
        this.showSuccessMessage =  true;
           this.showErrorMessage = false;
      }
    });
  }
 }
 deleteDetails(post:any){
  this.backendCallService.httpGet(`/netr/adds/deleteAdd/${post.Id}?apiVersion=1`).subscribe((x:any)=> {
    if(x instanceof Error) {
      this.ifError = true;
    }
    else 
    {
       this.deleteSuccess = true;
       this.getAllDetails();
    }
  });  
}
GetMyData(){
  const userDetails = localStorage.getItem("user");
  const userID = userDetails != null ? JSON.parse(userDetails).userId: "";
  this.backendCallService.httpGet(`/netr/profile/getProfileByUserId/${userID}?apiVersion=1`).subscribe((x:any)=> {
    if(x instanceof Error) {
      this.ifError = true;
    }
    else 
    {
       console.log(x.data);
       this.UpdateForm.controls['Firstname'].setValue(x.data.firstName);
       this.UpdateForm.controls['genderLocation'].setValue(x.data.gender);
       this.UpdateForm.controls['Emailid'].setValue(x.data.email);
       this.UpdateForm.controls['address'].setValue(x.data.address);
       this.UpdateForm.controls['Mobileno'].setValue(x.data.mobileNo);
       this.UpdateForm.controls['Lastname'].setValue(x.data.lastName);
       this.UpdateForm.controls['startDate'].setValue(x.data.dob);
       this.UpdateForm.controls['postLocation'].setValue(x.data.village.villageName);
       this.UpdateForm.controls['oldpic'].setValue(x.data.otherPic);
       if(x.data.otherPic && x.data.otherPic!=""){
        this.profilepicture = x.data.otherPic;
       }
       else{
        this.profilepicture = 'http://backend.myvdoc.in:5000/netr/' +x.data.profilePic;
       }
    }
  }); 
}
handleFileInput(files:any) {
  this.fileToUpload = files.files.item(0);
}
  
}