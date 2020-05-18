import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  storyline: any;
  comments: any;
  id: any;
  isLoading = false;
  isSuccess = false;
  submitted = false;
  tags: [];

  commentForm: FormGroup;
  constructor(private route: ActivatedRoute, private router: Router,
              private postService: PostService, private fb: FormBuilder,
              private meta: Meta, private title: Title ) {
    this.commentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      comment: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit() {
    // setting title and meta data for SEO
    this.meta.addTags([
      {name: 'author', content: 'ng-bloggy'},
      {name: 'description', content: 'Blog built and powerd by Angular on the FE.'},
      {name: 'keywork', content: 'NG-bloggy, Blog, Angular Blog, Angular'},

    ]);

    this.id = this.route.snapshot.params.id;

    this.postDetail(this.id);
    this.getPostComments();
  }


  postDetail(id) {
    this.postService.getPostById(this.id).subscribe(data => {
      this.storyline = data;
      this.tags = this.storyline.tags;
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
      // console.log('data gotten', data);
    });
  }

}
