import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';
import { auth } from 'firebase/app';
import {Router} from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postList: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) { }
  // getPost(post) {
  //  return this.db.list('/posts').push(post);
  // }

  getPost(posts) {
    this.postList.push({
      postTitle: posts.postTitle,
      postBody: posts.postBody
    });
  }
}
