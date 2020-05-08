import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import {UserService} from '../user.service';
import { ConnectionService } from 'ng-connection-service';

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
  status = 'ONLINE';
  isConnected = true;

  constructor(private postService: PostService, private user: UserService, private connectionService: ConnectionService) { 
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = 'ONLINE';
        alert('You are now connected');
      } else {
        this.status = 'OFFLINE';
        alert('You are offline');
      }
    });
  }
  

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
