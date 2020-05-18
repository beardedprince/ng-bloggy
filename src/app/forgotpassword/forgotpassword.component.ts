import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthsService} from '../auths.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit  {

  resetPasswordForm: FormGroup;
  success = false;
  submitted = false;
  email: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthsService,
              private meta: Meta, private title: Title) {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [ Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.title.setTitle('Ng-bloggy | Forgot-password');
    this.meta.addTags([
      {name: 'author', content: 'ng-bloggy'},
      {name: 'description', content: 'Blog built and powerd by Angular on the FE.'},
      {name: 'keywork', content: 'NG-bloggy, Blog, Angular Blog, Angular'},

    ]);
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
