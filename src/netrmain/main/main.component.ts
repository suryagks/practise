import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  idleState:any;
  constructor( private readonly idle: Idle,private router:Router){
      idle.setIdle(environment.IdleTimeOutInSec);
      idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
      idle.onTimeout.subscribe(() => {
        this.idleState = '';
        this.idle.stop();
        this.idle.onTimeout.observers.length = 0;
        this.idle.onIdleStart.observers.length = 0;
        this.idle.onIdleEnd.observers.length = 0;
      });
      idle.onIdleStart.subscribe(() => {
        this.idleState = '';
        this.idle.clearInterrupts();
        this.LogOut();
      });
      this.idle.watch();
  }
  LogOut(){
    alert('Session Expired');
    localStorage.clear();
    this.router.navigate(['/login']);
  }


  ngOnInit(): void {
  }

  logout()
  {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  
  
}

