import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';
import { auth } from 'firebase/app';
import {Router} from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class AuthsService {

  constructor(private afAuth: AngularFireAuth, private router: Router, private db: AngularFireDatabase) { }
  // Login user
  loginUser(email: string, password: string) {
    this.afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
        this.router.navigate(['/dashboard', 'profile']);
      })
      .catch(err => {
        console.log('Something went wrong:', err);
      });
  }

  registerUser(email: string, password: string) {
    this.afAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
        this.router.navigate(['/login']);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  sendVerification() {
    this.afAuth.auth.currentUser.sendEmailVerification();
  }

  sendPasswordResetMail(email: string) {
    this.afAuth.auth.sendPasswordResetEmail(email)
    .then(value => {
      console.log('password sent to mail');
      this.router.navigate(['/login']);
    });
  }


  googleLoginService() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    .then( () => {
      // console.log('works wella');
      this.router.navigate(['/dashboard', 'profile']);
    });
  }

  logOutUser() {
    this.afAuth.auth.signOut()
    .then(value => {
      console.log('user logged out successfully');
      this.router.navigate(['/']);
    });
  }

}

