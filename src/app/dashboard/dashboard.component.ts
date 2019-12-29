import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthsService} from '../auths.service';
import {PostService} from '../post.service';


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
  stackUp = Object;

  constructor(private afAuth: AngularFireAuth,
              private formBuilder: FormBuilder,
              private authService: AuthsService,
              private postService: PostService) {
    this.postForm = this.formBuilder.group({
      postTitle: ['', Validators.required],
      postBody: ['', Validators.required]
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
     localStorage.setItem('form-data', JSON.stringify(this.postForm.value) || '[]');
    //  this.postService.getPost(post);
   }

   logout() {
    this.afAuth.auth.signOut();
  }

}
