import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  path  = environment.path;
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.path + '/users');
  }

  // getAvatar() {
  //   return this.http.get('https://tinyfac.es/api/users');
  // }
}