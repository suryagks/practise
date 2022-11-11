import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup } from '@angular/forms';
import { BackendcallService } from 'src/app/services/backendcall.service';
import { villageDetails } from '../add-post/add-post.component';


@Component({
  selector: 'app-blood',
  templateUrl: './blood.component.html',
  styleUrls: ['./blood.component.scss']
})
export class BloodComponent implements OnInit {
  BloodForm =new FormGroup({
    postLocation: new FormControl(0),
    bloodGroupName: new FormControl(0),
    searchBloodGroups: new FormControl(""),



  });
  FileToUpload:any;
  locations:villageDetails[];
  bloodGroups:bloodGroupDetails[];
  data: Root [];
  showSuccessMessage= false;
  showErrorMessage=false;
  FailedErrorDetails: any;
  bloodgroupdata : any;


  constructor(private backendCallService: BackendcallService) {
    this.locations = [];
    this.bloodGroups = [];
    this.data=[];


   }

  ngOnInit(): void {
    this.loadLocations();
    this.getBloodGroups();
    this.searchBloodGroups();

  }

  loadLocations(){
    this.backendCallService.httpPost("",'/netr/village/getAllVillages?apiVersion=1').subscribe(x=> {
      if(x.internalMessage === "Village retrived successfully"){
       this.locations = x.data;
       console.log(this.locations);
      }

    });
  }
  getBloodGroups(){

    this.backendCallService.httpGet('/netr/bloodgroup/getBloodGroups?apiVersion=1').subscribe(x=> {
      if(x instanceof Error) {
            console.log("BloodGroup retrived successfully!")
          }
          else {
            this.bloodGroups = x ['data'];
            console.log(this.bloodGroups);
          }
    });
  }
  searchBloodGroups(){
    const villageId = this.BloodForm.value.postLocation;
    const BloodGroupId = this.BloodForm.value.bloodGroupName;

    this.backendCallService.httpGet(`/netr/auth/bloodDonorslist?villageId=${villageId}&BGroupId=${BloodGroupId}&skip=1&apiVersion=1`).subscribe(x=> {
      if(x instanceof Error) {
        console.log("BloodGroup retrived on Errrorrrr!")
      }
      else {
      this.bloodgroupdata = x.data;
      console.log(this.data);
      }
    });
  }

}
export interface bloodGroupDetails {
  Id: number
  Name: string
  bloodGroupName:	string
}
export interface Root {
  searchTerm: string
}