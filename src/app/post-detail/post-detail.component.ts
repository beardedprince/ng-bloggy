import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  storyline: object;
  comments: any;
  id: any;
  isLoading = false;
  isSuccess = false;
  submitted = false;
  commentForm: FormGroup;
  constructor(private route: ActivatedRoute, private postService: PostService, private fb: FormBuilder, private router: Router) {
    this.commentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      comment: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    console.log(this.id);

    this.postDetail(this.id);
    this.getPostComments();
  }


  postDetail(id) {
    this.postService.getPostById(this.id).subscribe(data => {
      this.storyline = data;
      console.log(this.storyline);
    }, err => {
      console.log('May Day!!', err);
    });
  }

  postComment(id ) {
    this.submitted = true;
    if (this.commentForm.invalid) {
      return;
    }
    this.isSuccess = true;
    this.isLoading = true;
    console.log(this.commentForm.value);
    this.postService.sendComment(this.id, this.commentForm.value).subscribe(data => {
      console.log(data);
      this.isSuccess = false;
      this.isLoading = false;
      this.submitted = false;
      this.getPostComments();
    }, err => {
      console.log('err occured here', err);
    });
   
    this.commentForm.reset();
    
  }

  getPostComments() {
    this.postService.getComment(this.id).subscribe(data => {
      this.comments = data;
      console.log('data gotten', data);
    });
  }

}
