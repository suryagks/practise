import { Component, OnInit } from '@angular/core';
import { BackendcallService } from 'src/app/services/backendcall.service';

@Component({
  selector: 'app-welfarestatus',
  templateUrl: './welfarestatus.component.html',
  styleUrls: ['./welfarestatus.component.scss']
})
export class WelfarestatusComponent implements OnInit {

  completedPercent=0;
  progressPercent=0;
   notStartedPercent=0;
  locations: any;
  welfareTypes: any;
  constructor(private backendCallService: BackendcallService) { }

  ngOnInit(): void {
    this.loadLocations();
    this.loadWelfareType();
  }
  loadLocations(){
    this.backendCallService.httpPost("",'/netr/village/getAllVillages?apiVersion=1').subscribe(x=> {
      if (x.internalMessage === "Village retrived successfully") {
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
