import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from 'src/interceptors';
import { ToggleMenuItemsDirective } from './toggle-menu-items.directive';



@NgModule({
  declarations: [
    ToggleMenuItemsDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  exports:[CommonModule,ReactiveFormsModule,HttpClientModule,ToggleMenuItemsDirective],
  providers: [httpInterceptorProviders],
})
export class SharedModule { }
