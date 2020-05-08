import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  storyline: object;
  id: any;
  constructor(private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    console.log(this.id);

    this.postDetail(this.id);
  }


  postDetail(id) {
    this.postService.getPostById(this.id).subscribe(data => {
      this.storyline = data;
      console.log(this.storyline);
    }, err => {
      console.log('May Day!!', err);
    });
  }

}
