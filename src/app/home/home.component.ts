import { Component, OnInit, HostListener, HostBinding } from '@angular/core';
import { PostService } from '../post.service';
import {UserService} from '../user.service';
import { ConnectionService } from 'ng-connection-service';
import {Meta, Title} from '@angular/platform-browser';
import {startWith} from 'rxjs/operators';
import { observable, Observable } from 'rxjs';
import { RouterEvent, NavigationStart, NavigationEnd, Router } from '@angular/router';

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
  isLoader: boolean;

  isShow: boolean;
  topPosToStartShowing = 100;

  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    console.log('[scroll]', scrollPosition);
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  constructor(private meta: Meta, private title: Title,
              private postService: PostService,
              private user: UserService, private router: Router,
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
    this.routerEvents();
    this.getPost();
  }

  routerEvents() {
    this.router.events.subscribe((event: RouterEvent) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.isLoader = true;
          break;
        }
        case event instanceof NavigationEnd: {
          this.isLoader = false;
          break;
        }
      }
    });
  }

  getPost() {
    this.postService.getPost().subscribe( data => {
      this.posts = data;
      localStorage.setItem('store2', JSON.stringify(data));
      // console.log('gotten post', this.posts);
    });
  }


  goToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }



}
