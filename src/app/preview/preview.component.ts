  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { UserService } from '../user.service';
  import { AuthsService } from '../auths.service';
  import { AngularFireAuth } from 'angularfire2/auth';

  @Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  idnum: any;
  profile: any;
  constructor(private afAuth: AngularFireAuth,
              private authService: AuthsService,
              private user: UserService,
              private router: Router) {}

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.idnum = JSON.parse(localStorage.getItem('data'));
    this.user.getUserDetails(this.idnum._id).subscribe(data => {
      this.profile = data;
      console.log(data);
    }, err => {
      console.log('err', err);
    });
  }

  goToNewPost()  {
    this.idnum =  JSON.parse(localStorage.getItem('data'));
    console.log('localstorage', this.idnum._id ) ;
    this.router.navigate(['/dashboard', 'new-post', this.idnum._id]);
    console.log('gotten id', this.idnum._id);
  }

}
