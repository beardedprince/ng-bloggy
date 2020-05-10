import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  storyline: object;
  id: any;
  commentForm: FormGroup;
  constructor(private route: ActivatedRoute, private postService: PostService, private fb: FormBuilder) { 
    this.commentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      comment: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    console.log(this.id);

    this.postDetail(this.id);
    // this.getPostComments();
  }


  postDetail(id) {
    this.postService.getPostById(this.id).subscribe(data => {
      this.storyline = data;
      console.log(this.storyline);
    }, err => {
      console.log('May Day!!', err);
    });
  }

  postComment(id) {
    console.log(this.commentForm.value);
    console.log(this.id);
    this.postService.sendComment(this.id, this.commentForm.value).subscribe(data => {
      console.log(data);
    }, err => {
      console.log('err occured here', err);
    });
  }

  // getPostComments() {
  //   this.postService.getComment(this.id).subscribe(data => {
  //     console.log(data);
  //   });
  // }

}
