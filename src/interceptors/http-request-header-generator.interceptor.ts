import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthserviceService } from 'src/AuthService/authservice.service';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestHeaderGeneratorInterceptor implements HttpInterceptor {

  constructor(private authserviceService: AuthserviceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    if(!request.url.includes('netr/auth/login')) 
    {
      let authToken =  this.authserviceService.GetAuthToken();
      request = request.clone({  
        setHeaders: {  
          Authorization: authToken,
         // 'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary6rwCfb8NWwWEW5AZ'
        }  
      });  
    }
     
    return next.handle(request);  
  }
}
