import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendcallService } from 'src/app/services/backendcall.service';
import * as XLXS from 'xlsx';

@Component({
  selector: 'app-extractevents',
  templateUrl: './ExtractEvents.component.html',
  styleUrls: ['./ExtractEvents.component.scss']
})
export class ExtractEventsComponent implements OnInit {
  dataToSend:any[] =  [];
  showSuccessMessage = false;
  showErrorMessage =  false;
  FailedErrorDetails:any = null;
  constructor(private backendCallService: BackendcallService) { }

  ngOnInit(): void {
  }
  
  isFormValid: boolean = true;
  statusMessage ="";
  EventsForm =  new FormGroup({
    excel: new FormControl ("",Validators.required),
  });

  uploadExcel()
  {
    for(let data of this.dataToSend){
      this.createAnEvent(data);
    }
   
    this.EventsForm.reset();

  }
  fileUpload(event: any) 
  {
    this.showSuccessMessage = false;
    this.showErrorMessage =  false;
    const selectedFiles = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFiles);
    fileReader.onload = (event:any) => {
      let binaryData = event.target.result;
      let workBook = XLXS.read(binaryData, {type: 'binary'});
      const data:any  = XLXS.utils.sheet_to_json(workBook.Sheets[workBook.SheetNames[0]], {raw: false});
      for(let x of data) 
      {
        console.log(x);
        const userDetails = localStorage.getItem("user");
        const userID = userDetails != null ? JSON.parse(userDetails).userId: "";
        const villageName =  x['Village'];

        this.backendCallService.httpPost({villageName: x['Village']}, '/netr/village/getVillageByVillageName').subscribe( y=> {
          console.log(y);
          const dataToSendFormObj  = new FormData();        
          dataToSendFormObj.append("eventTitle",x['Program']);
          dataToSendFormObj.append("eventDesc", x['Description & Invitees']);
          dataToSendFormObj.append("categoryId", "1"),
          dataToSendFormObj.append("eventStartDate", new Date(x['Start Date (dd/mm/yyyy)']).toDateString());
          dataToSendFormObj.append("eventStartTime", x['Start Time']);
          dataToSendFormObj.append("eventEndTime", x['End Time']);
          dataToSendFormObj.append("eventEndDate", new Date(x['End Date (dd/mm/yyyy)']).toDateString());
          dataToSendFormObj.append("userId", userID);
          dataToSendFormObj.append("guestIds", "19,20");
          dataToSendFormObj.append("versionFlag", "1");
          dataToSendFormObj.append("attachments","[]"),
          dataToSendFormObj.append("villageId", y.data.Id),
          dataToSendFormObj.append("public", ""),
          dataToSendFormObj.append("status", "true");
          dataToSendFormObj.append("createdUser", userID),
          dataToSendFormObj.append("Id", ""),
          this.dataToSend.push(dataToSendFormObj);
        });
      }
    }
    
  }
  createAnEvent(dataToSend:any) {
    this.backendCallService.httpPost(dataToSend, '/netr/event/createEvent').subscribe(x=> {
       
      if(x.internalMessage == 'Event created  successfully') {
          this.showSuccessMessage =  true;
      }
      else 
      {
        this.showErrorMessage = true;
        this.FailedErrorDetails = x;
      }
    });
    }
}


