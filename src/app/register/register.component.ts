import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, NgForm} from '@angular/forms';
import {AuthsService} from '../auths.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup;
  success = false;
  submitted = false;
  user: any;
  email: string;
  password: string;


  constructor(private formBuilder: FormBuilder, private authService: AuthsService) {
    this.registerForm = this.formBuilder.group({
      // firstName: ['', Validators.required],
      // lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
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

}
