import { Injectable } from '@angular/core';
import { Resolve,  ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PostService } from '../post.service';

@Injectable({
  providedIn: 'root'
})
export class PostResolverService implements Resolve<any> {
  constructor( private postService: PostService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id =  route.paramMap.get('id');
    return this.postService.getPostById(id);
  }

}
