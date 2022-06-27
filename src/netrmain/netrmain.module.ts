import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetrmainRoutingModule } from './netrmain-routing.module';
import { SharedModule } from 'src/shared/shared.module';

import { MainComponent } from './main/main.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MainComponent,
    SidenavComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    NetrmainRoutingModule,
    SharedModule,
    FormsModule

  ],
})
export class NetrmainModule { }
