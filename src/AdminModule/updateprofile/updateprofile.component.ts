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
    mobileNumber:new FormControl(""),
    firstName:new FormControl(""),
    gender: new FormControl(""),
    statDate: new FormControl(""),

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

  constructor(private backendCallService: BackendcallService) {
    this.locations =[];

   }

  ngOnInit(): void {
    this.loadLocations();
    this.getAllDetails();
    this.updateDetails();
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

 SaveData(){

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
  
}