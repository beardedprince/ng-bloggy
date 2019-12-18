import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthsService} from '../auths.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent  {

  resetPasswordForm: FormGroup;
  success = false;
  submitted = false;
  email: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthsService) {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [ Validators.required, Validators.email]]
    });
  }

 resetPass() {
  this.submitted = true;
  if (this.resetPasswordForm.invalid) {
    return;
  }
  this.success = true;
  this.authService.sendPasswordResetMail(this.resetPasswordForm.controls.email.value);
//       .then(res => {
//         console.log(res);
//         console.log("success", "Please Check Your Email");
//       }, err => {
//         console.log("danger", err.message);
//       });
}
}
