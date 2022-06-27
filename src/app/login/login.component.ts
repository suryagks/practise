import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginModel } from './loginModel';
import { BackendcallService } from '../services/backendcall.service';
import { AuthserviceService } from 'src/AuthService/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private backedncallService:BackendcallService, private authService:AuthserviceService) { }

  ngOnInit(): void {
  }
  invalidCredentials = false;
  invalidForm = false;

  loginDetails = new FormGroup({
    mobileNo: new FormControl('',Validators.required),
    pin: new FormControl('', Validators.required),
    fcmToken: new FormControl('')
  });

  //login action
  login()
  {
    console.log(this.loginDetails.value);
    if(this.loginDetails.valid)
    {
      this.backedncallService.httpPost(this.loginDetails.value, "/netr/auth/login").subscribe(x=>
      {
        if(x.internalMessage === "login successfully") 
        {
          this.authService.GetAndStoreUserDetails(x);
        }
        else 
        {
          this.invalidCredentials = true;
          this.loginDetails.reset();
        }
      });
    }
    else
    {
      this.invalidForm = true;
    }
  }
 //cancel action
 cancel(){
   this.loginDetails.reset();
 }
}
