import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import {AuthsService} from '../auths.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {

  user: firebase.User;

  constructor(private afAuth: AngularFireAuth, private authService: AuthsService) {
    afAuth.authState.subscribe(user => this.user = user);
   }
  logout() {
    this.authService.logOutUser();
  }
}
