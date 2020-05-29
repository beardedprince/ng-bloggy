import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './auth.guard';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NotfoundComponent} from './notfound/notfound.component';
import {ForgotpasswordComponent} from './forgotpassword/forgotpassword.component';
import { PostPageComponent } from './post-page/post-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { ProfileComponent } from './profile/profile.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PreviewComponent } from './preview/preview.component';
import { PostResolverService } from './resolvers/post-resolver.service';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login',  component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'dashboard', component: ProfileComponent },
  {path: 'dashboard/profile', component: PreviewComponent },
  {path: 'dashboard/edit-profile', component: EditProfileComponent },
  // {path: 'dashboard/new-post', component: DashboardComponent },
  {path: 'dashboard/new-post/:id', component: DashboardComponent },
  {path: 'dashboard/my-post', component: PostPageComponent },
  {path: 'dashboard/post/edit', component: EditPageComponent },
  {path: 'dashboard/post/edit/:id', component: EditPageComponent },
  {path: 'forgotpassword', component: ForgotpasswordComponent },
  {path: 'post/:id', component: PostDetailComponent, resolve: { postdetial: PostResolverService } },
  {path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
