import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/AuthService/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {path:  'login', component: LoginComponent},
  {path:  'registration', component:RegistrationComponent},
  {path:  'dashboard',loadChildren: () => import('../netrmain/netrmain.module').then(m => m.NetrmainModule)},
  {path:  '', component:LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
