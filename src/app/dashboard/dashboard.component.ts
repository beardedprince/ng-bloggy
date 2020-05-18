import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthsService} from '../auths.service';
import {PostService} from '../post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { QuillEditorComponent } from 'ngx-quill';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit  {

  postForm: FormGroup;
  submitted = false;
  success = false;
  user: firebase.User;
  editorContent: string;
  editorStyle = {
    height : '300px'
  };
  config = {
    syntax: true,
    toolbar: [
      ['bold', 'italic', 'underline', 'link'],
      ['code-block']
    ]
  };  
  id: any;
  idnum: any;
  chips: [];
  placeholder;

  constructor(private afAuth: AngularFireAuth,
              private formBuilder: FormBuilder,
              private authService: AuthsService,
              private postService: PostService,
              private router: Router,
              private route: ActivatedRoute) {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      postbody: ['', Validators.required],
      tags: ['']
    });
    afAuth.authState.subscribe(user => this.user = user);
   }

   ngOnInit() {
    this.id = this.route.snapshot.params.id;
    console.log('activated Route', this.id);
   }

   submitPost(post) {
     this.submitted = true;
     if (this.postForm.invalid) {
       return;
     }
     this.success = true;
     console.log(this.postForm.value);
     this.postService.sendPost(this.id, this.postForm.value ).subscribe( data => {
       console.log(data);
       this.router.navigate(['/', 'dashboard', 'my-post']);
     }, err => {
       console.log('the cause of error', err);
     });

   }

   logout() {
    this.afAuth.auth.signOut();
  }

  goToProfile()  {
    this.router.navigate(['/dashboard']);
  }

  goToNewPost()  {
    this.idnum =  JSON.parse(localStorage.getItem('data'));
    console.log('localstorage', this.idnum._id ) ;
    this.router.navigate(['/dashboard', 'new-post', this.idnum._id]);
    console.log('gotten id', this.idnum._id);
  }

  hidePreview(e) { console.log(e.getContent()); }

  tags() {
    this.placeholder = this.postForm.controls.tags.value;
    console.log(this.placeholder);
    if ( this.chips === null ) {
      return;
    } else {
      // this.chips.push(this.placeholder);
    }
  }
}
