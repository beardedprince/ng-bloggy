import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthsService} from '../auths.service';
import {PostService} from '../post.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  {

  postForm: FormGroup;
  submitted = false;
  success = false;
  user: firebase.User;

  constructor(private afAuth: AngularFireAuth,
              private formBuilder: FormBuilder,
              private authService: AuthsService,
              private postService: PostService,
              private router: Router) {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      postbody: ['', Validators.required]
    });
    afAuth.authState.subscribe(user => this.user = user);
   }

   submitPost(post) {
     this.submitted = true;
     if (this.postForm.invalid) {
       return;
     }
     this.success = true;
     console.log(this.postForm.value);
     this.postService.sendPost(this.postForm.value).subscribe( data => {
       console.log(data);
       this.router.navigate(['/', 'dashboard', 'post']);
     });
   }

   logout() {
    this.afAuth.auth.signOut();
  }

}
