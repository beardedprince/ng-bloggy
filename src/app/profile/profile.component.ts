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

  constructor(private afAuth: AngularFireAuth,
              private formBuilder: FormBuilder,
              private authService: AuthsService,
              private postService: PostService,
              private router: Router) {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      description: ['', Validators.required]
    });



  }

  ngOnInit() {
  }

  submitPost(post) {
    this.submitted = true;
    if (this.profileForm.invalid) {
      return;
    }
    this.success = true;
    console.log(this.profileForm.value);
    this.postService.createProfile(this.profileForm.value).subscribe(data => {
      console.log(data);
      this.router.navigate(['/', 'dashboard', 'new-post']);
    });
  }

}
