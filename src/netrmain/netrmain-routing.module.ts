import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/AuthService/auth.guard';
import { MainComponent } from './main/main.component';
import { SearchComponent } from '../netrmain/search/search.component';



const routes: Routes = [
  { path:'main',component:MainComponent,  children:[
    {path:  'admin', loadChildren: () => import('../AdminModule/Admin.module').then(m=>m.AdminModule)},
  ]},
  {path: 'search' ,component:SearchComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class NetrmainRoutingModule { }
