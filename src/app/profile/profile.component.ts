
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthsService } from '../auths.service';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Title, Meta } from '@angular/platform-browser';


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
              private user: UserService,
              private meta: Meta, private title: Title,
              private router: Router) {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      socials: this.formBuilder.group({
        twitter: ['', Validators.required],
        github: ['', Validators.required]
      }),
      avatar: [''],
      description: ['', Validators.required]
    });



  }

  ngOnInit() {
    this.title.setTitle('Ng-bloggy | Create Profile');
    this.meta.addTags([
      { name: 'author', content: 'ng-bloggy'},
      { name: 'description', content: 'Blog built and powerd by Angular on the FE.'},
      { name: 'keywork', content: 'NG-bloggy, Blog, Angular Blog, Angular'},

    ]);
    const get =  JSON.parse(localStorage.getItem('data'));
    console.log('localstorage', get._id ) ;
 }



  // uploadFile(event: any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     console.log('file', file);
  //     this.profileForm.get('avatar').setValue(file);
  //   }
  // }



  //   assignFormData(form: FormGroup) {
  //     const formData = new FormData();
  //     Object.keys(form.controls).forEach(key => {
  //       formData.append(key, form.get(key).value);
  //     });
  //     return formData;
  //   }



  createProfile() {
    // const formData = this.assignFormData(this.profileForm);
    // console.log('form data ', formData);
    this.user.createProfile(this.profileForm.value).subscribe(data => {
      if (data) {
        this.getResult = data;
        this.success = false;
        localStorage.setItem('data', JSON.stringify(data));
        const get =  JSON.parse(localStorage.getItem('data'));
        this.router.navigate(['/', 'dashboard', 'new-post', get._id]);
      }
    }, err => {
      console.log(err);
    });
  }


  // submit() {
  //   console.log('refactor', this.profileForm.value);
  //   this.createProfile(this.profileForm.value);
  // }

  // createProfile(payload: any) {
  //   this.user.createProfile(payload).subscribe(
  //     (res: any) => {
  //       if (res) {
  //         console.log(res);
  //       }
  //     },
  //     (error: any) => {
  //       console.log(error);
  //     }
  //   );
  // }

  giveAlert() {
    alert('please create a profile first');
  }

}
