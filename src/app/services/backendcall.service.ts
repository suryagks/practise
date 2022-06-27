import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthserviceService } from 'src/AuthService/authservice.service';
import { catchError, Observable} from 'rxjs';
import { ResponseModel } from './ResponseModel/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BackendcallService {

  constructor(private http:HttpClient, private authserviceService:AuthserviceService) {
    this.init();
  }
   backendurl: string ="";

  public httpPost(dataToSend:any, url:string)
  {
    return this.http.post<any>(this.backendurl+url, dataToSend).pipe(

      catchError(async (error) => this.handleError(error))
    );
  }
  public httpGet(url:string)
  {
    return this.http.get<ResponseModel>(this.backendurl+url).pipe(

      catchError(async (error) => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
    console.log('An error occurred:', error.error);
    } else {
      console.log(
        `Backend returned code ${error.status}, body was: `, error.error);
        console.log(error.error.message);
    }
    return new Error(error.error.message);
     // 'Something bad happened; please try again later.');
  }

  private init() {
    if(window.location.href.includes("5000")) {
      this.backendurl = environment.devurl;
    }

    else {
      this.backendurl = environment.devurl;
    }
  }
}
