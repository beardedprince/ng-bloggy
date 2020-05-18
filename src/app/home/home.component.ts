import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import {UserService} from '../user.service';
import { ConnectionService } from 'ng-connection-service';
import {Meta, Title} from '@angular/platform-browser';
import {startWith} from 'rxjs/operators';
import { observable, Observable } from 'rxjs';

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
  CACHE_KEY = 'homenews';
  use = new Observable();

  constructor(private meta: Meta, private title: Title,
              private postService: PostService,
              private user: UserService,
              private connectionService: ConnectionService) {
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
    this.title.setTitle('Ng-Bloggy | Home');
    this.meta.addTags([
      {name: 'author', content: 'ng-bloggy'},
      {name: 'description', content: 'Blog built and powerd by Angular on the FE.'},
      {name: 'keywork', content: 'NG-bloggy, Blog, Angular Blog, Angular'},

    ]);
    this.getPost();
    this.getUsers();
  }

  getPost() {
    this.postService.getPost().subscribe( data => {
      this.posts = data;
      localStorage[this.CACHE_KEY] = JSON.stringify(data);
      // this.posts = this.use.pipe(
      //   startWith(JSON.parse(localStorage[this.CACHE_KEY] || '[]' ))
      //   );
      // this.getCommentCount(this.id);
    });

  }

  getUsers() {
    this.user.getUsers().subscribe( data => {
      this.userList = data;
      // console.log(this.userList);
    });
  }


}
