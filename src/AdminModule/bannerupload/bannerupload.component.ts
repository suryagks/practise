import { identifierModuleUrl } from '@angular/compiler';
import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendcallService } from 'src/app/services/backendcall.service';

@Component({
  selector: 'app-bannerupload',
  templateUrl: './bannerupload.component.html',
  styleUrls: ['./bannerupload.component.scss']
})
export class BanneruploadComponent implements OnInit {

  constructor(private backendCallService:BackendcallService) { }
  tableData:any[] = []
  ifError:boolean =  false;
  deleteSuccess:boolean =  false;
  ngOnInit(): void 
  {
    this.getAllDetails();
  }

  isFormValid: boolean = true;
  successMessage = false;
  errorMessage = false;
  bannerUploadForm =  new FormGroup({
    image: new FormControl ("",Validators.required),
    redirectURL: new FormControl("",Validators.required)
  });
  dataToSend :any = null;
  fileUpload(event:any)
  {
    this.dataToSend =  new FormData();
    this.successMessage = false;
    this.errorMessage = false;
    this.deleteSuccess = false;
    const fileList: FileList = event.target.files;
        if (fileList.length > 0) 
        {
          this.dataToSend.append('image', fileList[0], fileList[0].name);
        }
  }

  uploadBannerImage()
  { 
    this.dataToSend.append('apiVersion', '1');
    this.dataToSend.append('redirectUrl', this.bannerUploadForm.value.redirectURL);
    this.dataToSend.append('location', 'Home');
    this.dataToSend.append('isHome', '1');
    this.backendCallService.httpPost(this.dataToSend,  "/netr/adds/createAdd").subscribe(x=> {
    if(x instanceof Error)
    {
       this.errorMessage =  true;
    }
    else if(x.internalMessage == "Add saved successfully")
    {
      this.bannerUploadForm.reset();
      this.successMessage = true;
      this.getAllDetails();
    }
   });
  }
  delete(post:any){
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
}
