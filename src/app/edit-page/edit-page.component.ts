import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';
import { analytics } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthsService } from '../auths.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {
  updatePostForm: FormGroup;
  // tslint:disable-next-line:variable-name
 id: string;
 user: firebase.User;
 editorStyle = {
   height : '300px'
 };
 config = {
   toolbar: [
     ['bold', 'italic', 'underline', 'link'],
     ['code-block']
   ]
 }


  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
              private postService: PostService, private router: Router,
              private afAuth: AngularFireAuth,
              private authService: AuthsService,
              ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.getPostEdit(this.id);
    this.createUpdateForm();
  }


  createUpdateForm() {
    this.updatePostForm = this.formBuilder.group({
      title: ['', Validators.required],
      postbody: ['', Validators.required]
    });
  }

  setUpdateData(data: any) {
    this.updatePostForm = this.formBuilder.group({
      title : data.title,
      postbody: data.postbody
    });
  }


  getPostEdit(id: any) {
    this.postService.getPostById(id).subscribe( (data: any) => {
      console.log('data yii', data);
      this.setUpdateData( data);

    }, err => {
      console.log('error getting post by id', err);
    });

  }

  submitEdit() {
    this.postService.updatePost(this.id, this.updatePostForm.value).subscribe( data => {
      console.log('data saved', data);
      this.router.navigate(['/', 'dashboard', 'my-post']);
    }, err =>  {
      console.log('err saving', err);
    });
  }


  cancelUpdate() {
    if (!this.updatePostForm.valid) {
      return alert('please save your edits first');
    } else {
      if (window.confirm('Are you sure?')) {
        this.router.navigate(['/dashboard', 'my-post']);
      }
    }
  }

}
