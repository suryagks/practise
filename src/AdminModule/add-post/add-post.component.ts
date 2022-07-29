import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendcallService } from 'src/app/services/backendcall.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  PostForm =  new FormGroup({
    postLocation: new FormControl (""),
    address: new FormControl (""),
    postDescription: new FormControl (null),
    Poll:this.fb.array([]),
    attachments: new FormControl(null)
  });
  fileToUpload:any;
  locations:villageDetails[];
  activeposts:any;
  showSuccessMessage= false;
  showErrorMessage=false;
  FailedErrorDetails: any;
  
  constructor(private  fb : FormBuilder,
    private backendCallService: BackendcallService) {
      this.locations = [];
     }

  ngOnInit(): void {
    this.loadLocations();
    this.GetActivePost();
  }
  loadLocations(){
    this.backendCallService.httpPost("",'/netr/village/getAllVillages?apiVersion=1').subscribe(x=> {
      if(x.internalMessage === "Village retrived successfully"){
       this.locations = x.data;
       console.log(this.locations); 
      }
       
    });
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
  SaveData(){
    // console.log(this.PostForm);
    const userDetails = localStorage.getItem("user");
    const userID = userDetails != null ? JSON.parse(userDetails).userId: "";
    const formData = this.PostForm.value;
    console.log(formData);
    if(formData.postDescription && formData.postLocation){
    const dataToSendFormObj  = new FormData();
    dataToSendFormObj.append("userId", userID);
    dataToSendFormObj.append("text", formData.postDescription);
    dataToSendFormObj.append("location", formData.address);

    let villageid = this.locations.find(x => x.villageName == formData.postLocation)?.Id
    villageid = villageid ? villageid : 0;
    dataToSendFormObj.append("villageId",villageid.toString());
    dataToSendFormObj.append("status","2");
    dataToSendFormObj.append("isDevelopmentPost","1");
    
    if(this.fileToUpload){
      console.log(this.fileToUpload)
      dataToSendFormObj.append("postTypeId","2");
      dataToSendFormObj.append("attachments",this.fileToUpload);
    }
    else if(formData.Poll.length && formData.Poll[0]){
      let polldata :string[]=[];
      formData.Poll.forEach((element: any) => {
        polldata.push(element.poll);
      });
      dataToSendFormObj.append("pollOptions",polldata.toString());
      console.log(formData.Poll.join(','));
      dataToSendFormObj.append("postTypeId","4");
      dataToSendFormObj.append("pollExpire",new Date().toLocaleDateString().toString())
    }
    else{
      dataToSendFormObj.append("postTypeId","1");
    }
    this.backendCallService.httpPost(dataToSendFormObj, '/netr/post/createPost?apiVersion=1').subscribe(x=> {
       
      if(x.internalMessage == 'Post Created Successfully') {
           this.showSuccessMessage =  true;
           this.showErrorMessage = false;
          console.log(x);
          this.PostForm.reset();
      }
      else 
      {
        this.showErrorMessage = true;
        this.showSuccessMessage =  false;
        this.FailedErrorDetails = x;
      }
    });
  }
  else{
    this.showErrorMessage = true;
    this.showSuccessMessage =  false;
    this.FailedErrorDetails = {
      message:"Description or Location invalid!!"};
  }
  }
  polls() : FormArray {  
    return this.PostForm.get("Poll") as FormArray  
  }  
  // OpenFileInput(FileInput){
  //   FileInput.click();
  // }
  // NewPollValue(){
  //   const poll = this.PostForm.get('Poll') as FormArray;
  //   poll.push("");
  // }
  newPoll(): FormGroup {  
    return this.fb.group({ 
      poll: null,  
    })  
  }  
  AddPoll(){
    this.polls().push(this.newPoll());  
  }
  RemovePoll(i:number) {  
    this.polls().removeAt(i);  
  }  
  pollOption(i:any){
    return 'Option '+(i+1);
  }
  handleFileInput(files:any) {
    this.fileToUpload = files.files.item(0);
}
}
export interface villageDetails {
  Id :	number
  villageName:	string
  mandalId:	number
  status:	boolean
  createdUser:	number
  updatedUser:	number
  versionFlag:	number

}