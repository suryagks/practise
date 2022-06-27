import { Component, OnInit } from '@angular/core';
import { BackendcallService } from 'src/app/services/backendcall.service';

@Component({
  selector: 'app-complaintstatus',
  templateUrl: './complaintstatus.component.html',
  styleUrls: ['./complaintstatus.component.scss']
})
export class ComplaintstatusComponent implements OnInit {

  completedPercent=0;
  progressPercent=0;
  notStartedPercent=0;
  locations: any;
  constructor(private backendCallService: BackendcallService) { }

  ngOnInit() {
    this.LoadComplaintStatus();
    this.loadLocations();
  }
  loadLocations(){
    this.backendCallService.httpPost("",'/netr/village/getAllVillages?apiVersion=1').subscribe(x=> {
      if(x.internalMessage === "Village retrived successfully"){
       this.locations = x.data;
       console.log(this.locations);
      }

    });
  }
  LoadComplaintStatus() {
    const userDetails = localStorage.getItem("user");
    const userID = userDetails != null ? JSON.parse(userDetails).userId: "";
    this.backendCallService.httpGet('/netr/complaint/getComplaints/'+userID+'?type=2&skip=1&apiVersion=1').subscribe(x=> {
      if(x instanceof Error) {
        console.log("Complaint APi Error !!")
      }
      else {
        const percentData = x.percentData;
        this.completedPercent = percentData.closedPercentage;
        this.progressPercent = percentData.inProgressPercentage;
        this.notStartedPercent = percentData.newPercentage;
      }

    });
  }


}
