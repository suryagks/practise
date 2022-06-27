import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private route:Router) { }

   userToken:string ='';

   //Store the user Details 
   GetAndStoreUserDetails(userDetails:any)
   {
     if(userDetails.internalMessage === "login successfully") 
     {
        this.userToken = userDetails.authtoken;
        localStorage.setItem("userToken", userDetails.authtoken);
        localStorage.setItem("user", JSON.stringify(userDetails.data));
        this.route.navigate(['/dashboard/main/admin']);
     }
     else 
     {
       console.log("Invalid login")
     }
   }

   //To Check the Authentication Status
   GetAuthenticationStatus():boolean
   {
      let isUserTokenAvailabe = this.GetAuthToken();
      if(isUserTokenAvailabe != "" && isUserTokenAvailabe != null) 
      {
        return true;
      }
      return false;
   }

   //To Get the AUth Token
   GetAuthToken():string
   {
      let userTokenToSend = this.userToken == "" ? localStorage.getItem("userToken") : this.userToken;
      if(userTokenToSend != null && userTokenToSend != "") 
      {
         return userTokenToSend;
      }
      else 
      {
        return "";
      }
   }
}
