import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthsService } from '../auths.service';
import { PostService } from '../post.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  profileForm: FormGroup;
  submitted = false;
  success = false;
  getResult: object;

  constructor(private afAuth: AngularFireAuth,
              private formBuilder: FormBuilder,
              private authService: AuthsService,
              private postService: PostService,
              private router: Router) {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      // avatar: [ '' ],
      description: ['', Validators.required]
    });



  }

  ngOnInit() {
    const get =  JSON.parse(localStorage.getItem('data'));
    console.log('localstorage', get._id ) ;
 }

  submitPost(post) {
    this.submitted = true;
    if (this.profileForm.invalid) {
      return;
    }
    console.log(this.profileForm.value);
    this.postService.createProfile(this.profileForm.value).subscribe(data => {
      this.getResult = data;
      this.success = false;
      // console.log('sdsds', this.getResult);
      localStorage.setItem('data', JSON.stringify(data));
      const get =  JSON.parse(localStorage.getItem('data'));
      console.log('localstorage', get._id ) ;
      this.router.navigate(['/', 'dashboard', 'new-post', get._id]);
    }, err => {
      console.log(err);
    });
  }

  giveAlert() {
    alert('please create a profile first');
  }

}
