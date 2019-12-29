import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

  formValue: any;

  constructor() {
this.formValue = JSON.parse(localStorage.getItem('form-data'));

console.log(this.formValue);
   }




}
