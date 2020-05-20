import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthsService } from '../auths.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { QuillEditorComponent } from 'ngx-quill';


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
  idnum: any;

  constructor(private postService: PostService, private router: Router, private formBuilder: FormBuilder,
              private afAuth: AngularFireAuth, private route: ActivatedRoute,
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
        //  console.log('message', data.message);
         this.getPosts();
         this.isLoading = false;
       }
     }, err => {
       console.log('another error', err);
     });
   }

  editPost(id) {
    // console.log('edit post id', id);
    this.router.navigate(['/dashboard', 'post', 'edit', id]);
  }

  getPosts() {
    this.idnum =  JSON.parse(localStorage.getItem('data'));
    // console.log('localstorage', this.idnum._id ) ;
    this.postService.getPostsByUserId(this.idnum._id).subscribe( data => {
      this.postList = data;
    });

  }

  goToNewPost()  {
    this.idnum =  JSON.parse(localStorage.getItem('data'));
    console.log('localstorage', this.idnum._id ) ;
    this.router.navigate(['/dashboard', 'new-post', this.idnum._id]);
    // console.log('gotten id', this.idnum._id);
  }


  // editIssue(id: string) {
  //   // console.log('item: ', id);
  //   this.router.navigate([`/edit/${id}`]);
  // }

}
