import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BackendcallService } from 'src/app/services/backendcall.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  activeposts:any;
  PostForm =  new FormGroup({
    postDescription: new FormControl (null),
    userName: new FormControl(null)
  });

  constructor(private backendCallService: BackendcallService) {
   }

  ngOnInit() {
    this.GetActivePost();
  }
  SaveData(){

  }
  GetActivePost(){
    const userDetails = localStorage.getItem("user");
    const userID = userDetails != null ? JSON.parse(userDetails).userId: "";
    this.backendCallService.httpGet('/netr/post/getActivePosts/'+userID+'?apiVersion=1&skip=1&type=1').subscribe(x=> {
      if(x instanceof Error) {
        console.log("GetActivePosts APi Error !!")
      }
      else{
        this.activeposts = x['data'];
      console.log(this.activeposts);
      }
    })
  }
  Edit(post:any){
    console.log(post);
    this.PostForm.controls['userName'].setValue(post.userName);
    this.PostForm.controls['postDescription'].setValue(post.text);
  }
  Delete(post:any){

  }
}
