import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NotfoundComponent} from './notfound/notfound.component';
import {ForgotpasswordComponent} from './forgotpassword/forgotpassword.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login',  component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'dashboard', component: DashboardComponent },
  {path: 'forgotpassword', component: ForgotpasswordComponent },
  {path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
