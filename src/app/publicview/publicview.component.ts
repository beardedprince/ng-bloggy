import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-publicview',
  templateUrl: './publicview.component.html',
  styleUrls: ['./publicview.component.css']
})
export class PublicviewComponent implements OnInit {

  profilePhoto: object;
  profile: any;
  bio: any;
  constructor(private title: Title, private meta: Meta,
              private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getProfile();
    this.getSingleProfileImage();
  }

  getProfile() {
    const get =  JSON.parse(localStorage.getItem('store'));
    this.postService.getPostsByUserId(get.postedBy._id).subscribe( result => {
      this.profile = result;
      this.bio = result;
    });
  }


  getSingleProfileImage() {
    this.postService.getSingleImage().subscribe( photo => {
      this.profilePhoto = photo;
    });
  }

}
