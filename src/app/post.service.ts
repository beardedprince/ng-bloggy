import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';
import { auth } from 'firebase/app';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {HttpClient } from '@angular/common/http';
import { environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postList: AngularFireList<any>;

  path  = environment.path;
  // post = 'http://localhost:3000/api/users';

  constructor(private db: AngularFireDatabase, private http: HttpClient) { }
  // getPost(post) {
  //  return this.db.list('/posts').push(post);
  // }

  // getPost(posts) {
  //   this.postList.push({
  //     postTitle: posts.postTitle,
  //     postBody: posts.postBody
  //   });
  // }

  createProfile(profileForm) {
    return this.http.post(this.path + '/users', profileForm);
  }

  // createProfile(profileForm) {
  //   return this.http.post('http://localhost:3000/upload', profileForm);
  // }

  sendPost(id: any, postForm) {
    const url = `${this.path + '/post'}/${id}`;
    return this.http.post(url, postForm);
  }

  getPost() {
    return this.http.get(this.path + '/post');
  }

  getPostById(id) {
    const url = `${this.path + '/post'}/${id}`;
    return this.http.get(url);
  }

  deletePost(id) {
    const url = `${this.path + '/post'}/${id}`;
    return this.http.delete(url );
  }
// updatePost
  updatePost(id: any, updatePostForm) {
    const url = `${this.path + '/post'}/${id}`;
    return this.http.put(url, updatePostForm );
  }

// commenting system
  sendComment(id: any, commentForm) {
    const url = `${this.path + '/comment'}/${id}`;
    return this.http.post(url, commentForm);
  }

  getComment(id) {
    const url = `${this.path + '/comment'}/${id}`;
    return this.http.get(url);
  }
}
