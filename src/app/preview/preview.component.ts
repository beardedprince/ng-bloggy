  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { UserService } from '../user.service';
  import { AuthsService } from '../auths.service';
  import { AngularFireAuth } from 'angularfire2/auth';
  import { Title, Meta } from '@angular/platform-browser';

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
              private meta: Meta, private title: Title,
              private router: Router) {}

  ngOnInit() {

    this.title.setTitle('Ng-bloggy | Profile preview');
    this.meta.addTags([
      { name: 'author', content: 'ng-bloggy'},
      { name: 'description', content: 'Blog built and powerd by Angular on the FE.'},
      { name: 'keywork', content: 'NG-bloggy, Blog, Angular Blog, Angular'},

    ]);

    this.getUserDetails();
  }

  getUserDetails() {
    this.idnum = JSON.parse(localStorage.getItem('data'));
    this.user.getUserDetails(this.idnum._id).subscribe(data => {
      this.profile = data;
    }, err => {
      console.log('err', err);
    });
  }

  goToNewPost()  {
    this.idnum =  JSON.parse(localStorage.getItem('data'));
    this.router.navigate(['/dashboard', 'new-post', this.idnum._id]);
  }

  deleteAccount() {
    const affirm = confirm('Are you sure you want to exit??');
    if (affirm === true) {
      this.idnum = JSON.parse(localStorage.getItem('data'));

      this.user.deleteUserAccountbyID(this.idnum._id).subscribe( data => {
      localStorage.removeItem('data');
      this.authService.logOutUser();
      this.router.navigate(['/']);
    }, err => {
      console.log('Err occured here', err);
    });
    } else {
      this.router.navigateByUrl('/', {skipLocationChange: true})
      .then(() => this.router.navigate(['/dashboard', 'profile']));
    }

  }
}
