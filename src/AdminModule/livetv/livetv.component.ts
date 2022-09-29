import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { BackendcallService } from 'src/app/services/backendcall.service';

let userDetails = localStorage.getItem("user");
let userID = userDetails != null ? JSON.parse(userDetails).userId: "";

@Component({
  selector: 'app-livetv',
  templateUrl: './livetv.component.html',
  styleUrls: ['./livetv.component.scss']
})
export class LivetvComponent implements OnInit {

  livetvchannels :LiveTV[]= [];
  currenttv: SafeResourceUrl = "";
  livetvUrl: string = "";
  isFormValid: boolean = true;
  statusMessage ="";
  livetvchannelForm =new FormGroup({
    title:new FormControl ("",Validators.required),
    youtubeLink: new FormControl("", Validators.required),
  });
  showSuccessMessage=false;
  showErrorMessage=false;
  FailedErrorDetails: any;
  deleteSuccess: boolean = false;
  ifError: boolean = false;

  uploadLivetvcannelLink(){
    if(this.livetvchannelForm.valid)
    {
      if(this.buttonText ==="Add")
      {
        this.livetvchannelForm.value["Id"] = 0;
        this.livetvchannelForm.value["status"] = 1;
        this.livetvchannelForm.value["createdUser"] = userID;
        this.livetvchannelForm.value["updatedUser"] = userID;
        this.livetvchannelForm.value["versionFlag"] = 0;
        const dataToSendFormObj  = new FormData();
        const formData = this.livetvchannelForm.value;
    dataToSendFormObj.append("livetvUrl", formData.youtubeLink);
    dataToSendFormObj.append("livetvTitle", formData.title);
    dataToSendFormObj.append("livetvMessage", formData.title);
    dataToSendFormObj.append("createdUser", userID);
    dataToSendFormObj.append("updatedUser", userID);
    dataToSendFormObj.append("status","true");
    console.log(dataToSendFormObj);

        this.backendCallService.httpPost(dataToSendFormObj,`/netr/livetv/create?apiVersion=1`).subscribe((x:any)=>{
          console.log(x);
          this.livetvchannelForm.reset();
          this.liveTvInilize();
        })

      }
    }

  }
  constructor(private backendCallService: BackendcallService,
    private domSanitizer: DomSanitizer) {
      this.currenttv =  this.domSanitizer.bypassSecurityTrustResourceUrl("");
    }
    allYoutubeLinks :any[] = [];
  buttonText:string="Add";
  id: number = 0;


  ngOnInit(): void {
    this.liveTvInilize();
  }

  private liveTvInilize() {
    this.backendCallService.httpGet(`/netr/livetv/getlivetv/1?apiVersion=1`).subscribe((x: any) => {
      if (x instanceof Error) {
        // this.ifError = true;
      }

      else {
        console.log(x);
        this.livetvchannels = x.data;
        this.livetvchannels  = this.livetvchannels.filter(x=>x.isActive == true);
      }
    });
  }

  ChangeChannel(livetvUrl: string){
   const tv =  "https://www.youtube.com/embed/"+livetvUrl;
   this.livetvUrl = livetvUrl;
   this.currenttv = tv;
    this.currenttv = this.domSanitizer.bypassSecurityTrustResourceUrl(tv);
    console.log(this.currenttv)
  }
  Edit(Id : LiveTV){
    const userDetails = localStorage.getItem("user");
  const userID = userDetails != null ? JSON.parse(userDetails).userId: "";
  if (confirm("Are you sure you want to Edit ?") == true) {
    const dataToSendFormObj  = new FormData();
    const formData = this.livetvchannelForm.value;
    dataToSendFormObj.append("Id", Id.Id);
    dataToSendFormObj.append("livetvTitle", Id.livetvTitle);
    dataToSendFormObj.append("livetvMessage", Id.livetvMessage);
    dataToSendFormObj.append("livetvUrl", Id.livetvUrl);
    dataToSendFormObj.append("createdUser", userID);
    dataToSendFormObj.append("updatedUser", userID);
    dataToSendFormObj.append("versionFlag", "1");
    dataToSendFormObj.append("livetvThumbnail", Id.livetvThumbnail);
    dataToSendFormObj.append("status",'1'); 
    this.backendCallService.httpPost(dataToSendFormObj,`/netr/livetv/update?apiVersion=1`).subscribe((x:any) => {
      console.log(x);
    });
  }
  }
  deleteUser(Id : LiveTV){
    const userDetails = localStorage.getItem("user");
  const userID = userDetails != null ? JSON.parse(userDetails).userId: "";
  if (confirm("Are you sure you want to Delete ?") == true) {
    const dataToSendFormObj  = new FormData();
    const formData = this.livetvchannelForm.value;
    dataToSendFormObj.append("Id", Id.Id);
    dataToSendFormObj.append("livetvTitle", Id.livetvTitle);
    dataToSendFormObj.append("livetvMessage", Id.livetvMessage);
    dataToSendFormObj.append("livetvUrl", Id.livetvUrl);
    dataToSendFormObj.append("createdUser", userID);
    dataToSendFormObj.append("updatedUser", userID);
    dataToSendFormObj.append("versionFlag", "1");
    dataToSendFormObj.append("livetvThumbnail", Id.livetvThumbnail);
    dataToSendFormObj.append("status",'1'); 
    this.backendCallService.httpPost(dataToSendFormObj,`/netr/livetv/update?apiVersion=1`).subscribe((x:any) => {
      console.log(x);
    });
  }
  }
}
export interface LiveTV {
  Id : string;
  isActive : boolean;
  livetvMessage : string;
  livetvThumbnail : string;
  livetvTitle: string;
  livetvUrl : string;
}