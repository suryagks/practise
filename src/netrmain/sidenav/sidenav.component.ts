import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  userRole  = "";
  constructor() { }

  ngOnInit(): void {
    const userDetails = localStorage.getItem("user");
    this.userRole = userDetails != null ? JSON.parse(userDetails).roleName: "";
  }
  CheckAdmin(){
    return this.userRole === "Admin" || this.userRole === "MLA";
  }
}
