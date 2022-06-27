import { Component, OnInit } from '@angular/core';
import { BackendcallService } from 'src/app/services/backendcall.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  locations: any;
  searchTxt:string="";;

  constructor(private backendCallService: BackendcallService) { }

  ngOnInit() {
    // this.loadLocations();
  }
  loadLocations(value:string){
    // console.log(value);
    
    const userDetails =localStorage.getItem("user");
    const userID = userDetails != null ? JSON.parse(userDetails).userId:"";
    let obj ={
  "searchTerm": this.searchTxt
      }

    this.backendCallService.httpPost(obj,'/netr/auth/searchUser').subscribe((x:any)=> {

        //  console.log(x,'k');
        this.locations = x.data;
         
        console.log(this.locations);
        
      //}
    });
  }


}
