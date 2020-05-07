import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import {UserService} from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  formValue: any;
  posts: object;
  postBy: any;
  userList: object;
  // avatars: object;

  constructor(private postService: PostService, private user: UserService) { }

  ngOnInit() {
    this.getPost();
    this.getUsers();
    // this.getAvatar();
  }

  getPost() {
    this.postService.getPost().subscribe( data => {
      this.posts = data;
      console.log(this.posts);
    });
  }

  getUsers() {
    this.user.getUsers().subscribe( data => {
      this.userList = data;
      console.log(this.userList);
    });
  }


  // getAvatar() {
  //   this.user.getAvatar().subscribe( data => {
  //     this.avatars = data;
  //     console.log(this.avatars);
  //   });
  // }




}
