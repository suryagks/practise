import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendcallService } from 'src/app/services/backendcall.service';
import { ResponseModel } from 'src/app/services/ResponseModel/ResponseModel';

@Component({
  selector: 'app-usersposts',
  templateUrl: './usersposts.component.html',
  styleUrls: ['./usersposts.component.scss']
})
export class UserspostsComponent implements OnInit {

  constructor(private backendcallService:BackendcallService, private router:Router, private activatedRoute:ActivatedRoute) { }

  postData:any  = [];
  showMessage = false;
  valueToGetData:any;
  ngOnInit(): void 
  {
     this.activatedRoute.data.subscribe(x=> {
       this.valueToGetData = x['value'];
       console.log(x);
      this.getData(x['value']);
     });
    
  }

  getData(x:any) {
    this.backendcallService.httpGet(`/netr/post/getNewPosts?apiVersion=1&skip=0&type=${x}`).subscribe((x:any) => {
      if(x.internalMessage === 'Data retrieved successfully') {
          this.postData = x.data;
      }
    });
  }

  approve(post:any) 
  {
    let dataToSend = {
      postId: post.postId,
      status: 1
    }
    this.backendcallService.httpPost(dataToSend, "/netr/post/postApproval").subscribe(x=> {
      console.log(x);
      if(x.statusCode === 50000) {
        this.showMessage = true;
        this.getData(this.valueToGetData);
      }
    });  
  }
  decline(post:any) 
  {
    let dataToSend = {
      postId: post.postId,
      status: 3
    }
    this.backendcallService.httpPost(dataToSend, "/netr/post/postApproval").subscribe(x=> {
      console.log(x);
      this.getData(this.valueToGetData);
    });  
  }

}
