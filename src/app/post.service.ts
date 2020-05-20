import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';
import { auth } from 'firebase/app';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {HttpClient } from '@angular/common/http';
import { environment} from '../environments/environment';
import {Posts } from './models/post';

import {shareReplay} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postList: AngularFireList<any>;

  path  = environment.path;
  posts$: Observable<Posts[]>;

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

  

  sendPost(id: any, postForm) {
    const url = `${this.path + '/post'}/${id}`;
    return this.http.post(url, postForm);
  }

  getPost(): Observable<Posts[]> {
    if (!this.posts$) {
      this.posts$ = this.http.get<Posts[]>(this.path + '/post').pipe(shareReplay(1));
    }
    return this.posts$;
  }

  getPostById(id) {
    const url = `${this.path + '/post'}/${id}`;
    return this.http.get(url);
  }

  getPostsByUserId(id) {
    const url = `${this.path + '/post' + '/user'}/${id}`;
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
    const url = `${this.path + '/comments'}/${id}`;
    return this.http.get(url);
  }

  getCommentsCountById(id) {
    const url = `${this.path + '/comments' + '/count'}/${id}`;
    return this.http.get(url);
  }
}
