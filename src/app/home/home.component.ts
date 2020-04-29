import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { PostService } from '../post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  formValue: any;
  posts: object;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPost().subscribe( data => {
      this.posts = data;
    })
  }


}
