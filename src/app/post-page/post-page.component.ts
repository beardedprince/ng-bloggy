import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthsService } from '../auths.service';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {
  postList: any;
  id: any;
  isLoading = false;
  postForm: FormGroup;
  success = false;
  user: firebase.User;
  editorContent: any;

  constructor(private postService: PostService, private router: Router, private formBuilder: FormBuilder, private afAuth: AngularFireAuth,
              private authService: AuthsService) {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      postbody: ['', Validators.required]
    });
   }

  ngOnInit() {
    this.getPosts();
  }

  deletePost(id: string): void {
    this.isLoading = true;
    console.log('post ', id);
    this.postService.deletePost(id).subscribe( (data: any) => {
       if (data.message) {
         console.log('message', data.message);
         this.getPosts();
         this.isLoading = false;
       }
     }, err => {
       console.log('another error', err);
     });
   }

  editPost(id) {
    console.log('edit post id', id);
    this.router.navigate(['/dashboard', 'post', 'edit', id]);
  }

  getPosts() {
    this.postService.getPost().subscribe( data => {
      this.editorContent = data;
      this.postList = this.editorContent;
      console.log(this.postList);
    });

  }

  // editIssue(id: string) {
  //   // console.log('item: ', id);
  //   this.router.navigate([`/edit/${id}`]);
  // }

}
