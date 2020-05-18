import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, NgForm} from '@angular/forms';
import {AuthsService} from '../auths.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  success = false;
  submitted = false;
  user: any;
  email: string;
  password: string;
  fieldTextType: boolean;


  constructor(private formBuilder: FormBuilder, private authService: AuthsService,
              private meta: Meta, private title: Title) {
    this.registerForm = this.formBuilder.group({
      // firstName: ['', Validators.required],
      // lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
   }

   ngOnInit()  {
    this.title.setTitle('Ng-bloggy | Register');
    this.meta.addTags([
      {name: 'author', content: 'ng-bloggy'},
      {name: 'description', content: 'Blog built and powerd by Angular on the FE.'},
      {name: 'keywork', content: 'NG-bloggy, Blog, Angular Blog, Angular'},

    ]);
   }

register() {
  this.submitted = true;
  if (this.registerForm.invalid) {
    return;
  }
  this.success = true;
  this.authService.registerUser( this.registerForm.value.email, this.registerForm.value.password);
  console.log(this.registerForm.controls.email.value);
}

toggleFieldTextType() {
  this.fieldTextType = !this.fieldTextType;
}

}
