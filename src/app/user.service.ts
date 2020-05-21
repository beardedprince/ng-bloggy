import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  path  = environment.path;
  constructor(private http: HttpClient) { }

  createProfile(profileForm) {
    return this.http.post(this.path + '/users', profileForm);
  }

  getUserDetails(id) {
    const url = `${this.path + '/users'}/${id}`;
    return this.http.get(url);
  }

  editProfileByID(id: any, editProfileForm) {
    const url = `${this.path + '/users'}/${id}`;
    return this.http.put(url, editProfileForm );
  }

  deleteUserAccountbyID(id) {
    const url = `${this.path + '/users'}/${id}`;
    return this.http.get(url);
  }
}
