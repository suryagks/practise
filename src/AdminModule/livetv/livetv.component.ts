import { Component, OnInit } from '@angular/core';
import { BackendcallService } from 'src/app/services/backendcall.service';

@Component({
  selector: 'app-livetv',
  templateUrl: './livetv.component.html',
  styleUrls: ['./livetv.component.scss']
})
export class LivetvComponent implements OnInit {

  livetvchannels :any= [];
  currenttv: string = "";
  constructor(private backendCallService: BackendcallService) { }

  ngOnInit(): void {
    this.backendCallService.httpGet(`/netr/livetv/getlivetv/1?apiVersion=1`).subscribe((x:any)=> {
      if(x instanceof Error) {
        // this.ifError = true;
      }
      else 
      {
        console.log(x);
        this.livetvchannels = x.data;
      }
    });
  }
  ChangeChannel(livetvUrl: string){
 this.currenttv = livetvUrl;
 console.log(this.currenttv)
  }

}
