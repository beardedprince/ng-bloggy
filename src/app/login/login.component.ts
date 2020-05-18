import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {AuthsService} from '../auths.service';
import {Router} from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {

  loginForm: FormGroup;
  submitted = false;
  success = false;
  email: string;
  password: string;
  fieldTextType: boolean;


  constructor(  private afAuth: AngularFireAuth,
                private formBuilder: FormBuilder,
                private authService: AuthsService,
                private meta: Meta, private title: Title
                ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]

    });
  }

  ngOnInit() {
    this.title.setTitle('Ng-bloggy | login');
    this.meta.addTags([
      {name: 'author', content: 'ng-bloggy'},
      {name: 'description', content: 'Blog built and powerd by Angular on the FE.'},
      {name: 'keywork', content: 'NG-bloggy, Blog, Angular Blog, Angular'},

    ]);
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.submitted = true;
    console.log(this.loginForm.value);
    this.authService.loginUser( this.loginForm.controls.email.value , this.loginForm.controls.password.value);
    console.log(this.loginForm.controls.email.value);
}


  googleLogin() {
    this.authService.googleLoginService();
    // this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    // .then( () => {
    //   // console.log('works wella');
    //   this.router.navigate(['/dashboard']);
    // });
  }

  forgotPassword() {
    this.authService.sendPasswordResetMail(this.email);
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
