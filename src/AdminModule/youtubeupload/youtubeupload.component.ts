import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendcallService } from 'src/app/services/backendcall.service';
import { ResponseModel, YoutubeData } from 'src/app/services/ResponseModel/ResponseModel';

let userDetails = localStorage.getItem("user");
let userID = userDetails != null ? JSON.parse(userDetails).userId: "";

@Component({
  selector: 'app-youtubeupload',
  templateUrl: './youtubeupload.component.html',
  styleUrls: ['./youtubeupload.component.scss']
})
export class YoutubeuploadComponent implements OnInit {

  constructor(private backendcallService:BackendcallService) { }
  youtubeLinkTypes : any[] = [{Id:1, Name:'1'},{Id:2, Name:'2'},{Id:3, Name:'3'},{Id:4, Name:'4'},{Id:5, Name:'5'}];
  allYoutubeLinks :any[] = [];
  buttonText:string="Add";
  id: number = 0;
 
  ngOnInit(): void
  {
    this.GetLinkTypeMaster();
    this.GetAllYoutubeLinks();
  }
  isFormValid: boolean = true;
  statusMessage ="";
  youtubeLinkForm =  new FormGroup({
    title: new FormControl ("",Validators.required),
    youtubeLink: new FormControl("", Validators.required),
    linkType: new FormControl("", Validators.required)
  });

  private GetLinkTypeMaster() {
    this.backendcallService.httpGet("/netr/youtubelinks/getAllLinkTypes?apiVersion=1").subscribe(x => {
      if (x instanceof Error) {
        this.statusMessage = "some issue while editing the links";
      }
      else {
        this.youtubeLinkTypes = x.data;
      }
    });
  }

  uploadYoutubeLink(){
    if(this.youtubeLinkForm.valid)
    {
      if(this.buttonText === "Add")
      {
        this.youtubeLinkForm.value["Id"] = 0;
        this.youtubeLinkForm.value["status"] = 1;
        this.youtubeLinkForm.value["createdUser"] = userID;
        this.youtubeLinkForm.value["updatedUser"] = userID;
        this.youtubeLinkForm.value["versionFlag"] = 0;
        this.backendcallService.httpPost(this.youtubeLinkForm.value,"/netr/youtubelinks/createLinks?apiVersion=1").subscribe(x => {
          if(x instanceof Error)
          {
            this.statusMessage =  "some issue while editing the links"
          }
          else {
            this.statusMessage =x.internalMessage
            this.youtubeLinkForm.reset();
            this.GetAllYoutubeLinks();

          }
        });
      }
      else if(this.buttonText === "Update")
      {
        this.youtubeLinkForm.value["Id"] = this.id;
        this.youtubeLinkForm.value["status"] = true;
        this.youtubeLinkForm.value["updatedUser"] = userID;
        this.youtubeLinkForm.value["versionFlag"] = 0;
        this.backendcallService.httpPost(this.youtubeLinkForm.value,"/netr/youtubelinks/updateLinks?apiVersion=1").subscribe(x => {
          if(x instanceof Error)
          {
            this.statusMessage =  "some issue while editing the links"
          }
          else {
            this.statusMessage =x.internalMessage
            this.youtubeLinkForm.reset();
            this.GetAllYoutubeLinks();
            this.buttonText = "Add"
          }

      });
      }
    }
    else
    {
       this.isFormValid = false;
    }
  }

  GetAllYoutubeLinks() {
    this.backendcallService.httpGet('/netr/youtubelinks/getAllLinks?apiVersion=1&skip=0').subscribe(x=> {
      if(x instanceof Error) {}
      else
      {
        this.allYoutubeLinks = [];
        for(let y of x.data)
        {
          for(let z of y.list)
          {
            z.title = y.title;
            this.allYoutubeLinks.push(z);
          }
        }
        console.log(this.allYoutubeLinks);
      }
    });
  }
  Edit(post:YoutubeData){
    this.buttonText = "Update"
    this.youtubeLinkForm.patchValue({
      title:post.title,
      youtubeLink:post.youtubeLink,
      linkType: post.linkType
    });
    this.id = post.Id;
  }
  Delete(post:YoutubeData)
  {

    const dataToSend = {
      Id: post.Id,
      status: false,
      updatedUser: userID,
      versionFlag: 0
    };
    this.backendcallService.httpPost(dataToSend,'/netr/youtubelinks/deleteLink?apiVersion=1').subscribe(x=> {
      if(x instanceof Error)
      {
        this.statusMessage =  "some issue while deleting the links"
      }
      else
      {
        this.statusMessage =x.internalMessage;
        this.youtubeLinkForm.reset();
        this.GetAllYoutubeLinks();
        this.buttonText = "Add"
      }
    });
  }
}

