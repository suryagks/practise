import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendcallService } from 'src/app/services/backendcall.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  constructor(private route :ActivatedRoute, private backendcallService: BackendcallService, private router:Router ) { }

  data = {
    postId: 0,
    isDevelopmentPost: "",
    text: "",
    postDays: "",
    postTime: "",
    postTypeId: "",
    villageId: "",
    villageName: "",
    userId: "",
    userName: "",
    profilePic: "",
    postImages: [],
    postVideos: [], 
    poll: [],
    pollExpire: "",
    viewCount: null
  };
  showMessage= false;
  ngOnInit(): void {
    this.route.params.subscribe(params=>
      {
        this.data=JSON.parse(params['data']);
        console.log(this.data);
      }
      );
  }
  approve() 
  {
    let dataToSend = {
      postId: this.data.postId,
      status: 1
    }
    this.backendcallService.httpPost(dataToSend, "/netr/post/postApproval").subscribe(x=> {
      console.log(x);
      if(x.statusCode === 50000) {
        this.showMessage = true;
        setTimeout(() => {
          this.router.navigate(['adminactions/reviewpost']);
      }, 5000); 
      }
    });  
  }
  decline() 
  {
    let dataToSend = {
      postId: this.data.postId,
      status: 3
    }
    this.backendcallService.httpPost(dataToSend, "/netr/post/postApproval").subscribe(x=> {
      console.log(x);
      if(x.statusCode === 3000) {
        this.showMessage = true;
      }
    });  
  }

}
