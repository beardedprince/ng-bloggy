import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { PostService } from '../post.service';
import { AuthsService } from '../auths.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  editProfileForm: FormGroup;
  submitted = false;
  isLoading = false;
  success = false;
  idnum: any;
  id: any;
  constructor(private afAuth: AngularFireAuth,
              private formBuilder: FormBuilder,
              private authService: AuthsService,
              private user: UserService,
              private router: Router) {
    this.editProfileForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      socials: this.formBuilder.group({
        twitter: ['', Validators.required],
        github: ['', Validators.required]
      }),
      description: ['', Validators.required]
    });



  }

  ngOnInit() {

    this.idnum = JSON.parse(localStorage.getItem('data'));
    this.id = this.idnum._id;
    console.log('ididi', this.id);
    this.getProfileDetail();
  }

  getProfileDetail() {
    this.idnum = JSON.parse(localStorage.getItem('data'));
    this.user.getUserDetails(this.idnum._id).subscribe(data => {
      this.fillUserDetials(data);
    }, err => {
      console.log('Err occured here', err);
    });
  }

  fillUserDetials(data: any) {
    this.editProfileForm = this.formBuilder.group({
      name: data.name,
      username: data.username,
      socials: this.formBuilder.group({
        twitter: data.socials[0].twitter,
        github: data.socials[0].github
      }),
      description: data.description

    });
  }

  submitEdit() {
    this.isLoading = true;
    this.idnum = JSON.parse(localStorage.getItem('data'));
    this.user.editProfileByID(this.id, this.editProfileForm.value).subscribe(data => {
      console.log('profile saved', data);
      this.isLoading = false;
      this.router.navigate(['/', 'dashboard', 'profile']);
    }, err => {
      console.log('Err occured here', err);
    });
  }

  cancelEdit() {
    const affirm = confirm('Are you sure you want to exit??');
    if (affirm === true) {
      this.router.navigate(['/dashboard', 'profile']);
    } else {
      this.router.navigateByUrl('/', {skipLocationChange: true})
      .then(() => this.router.navigate(['/dashboard', 'edit-profile']));
      // if (affirm === false) {
      //   this.router.onSameUrlNavigation = 'ignore';
      // }
    }
  }



}
