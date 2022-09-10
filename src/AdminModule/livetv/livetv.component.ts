import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { BackendcallService } from 'src/app/services/backendcall.service';

@Component({
  selector: 'app-livetv',
  templateUrl: './livetv.component.html',
  styleUrls: ['./livetv.component.scss']
})
export class LivetvComponent implements OnInit {

  livetvchannels :any= [];
  currenttv: SafeResourceUrl = "";
  livetvUrl: string = "";
  constructor(private backendCallService: BackendcallService,
    private domSanitizer: DomSanitizer) { 
      this.currenttv =  this.domSanitizer.bypassSecurityTrustResourceUrl("");
    }

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
   const tv =  "https://www.youtube.com/embed/"+livetvUrl;
   this.livetvUrl = livetvUrl;
   this.currenttv = tv;
    this.currenttv = this.domSanitizer.bypassSecurityTrustResourceUrl(tv);
    console.log(this.currenttv)
  }

}
