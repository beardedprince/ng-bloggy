import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {ReactiveFormsModule} from '@angular/forms';
// components

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { PostPageComponent } from './post-page/post-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PreviewComponent } from './preview/preview.component';



import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { QuillModule } from 'ngx-quill';
import { TagInputModule } from 'ngx-chips';

// services
import { PostService } from './post.service';
// import { NgxEditorModule } from 'ngx-editor';
import { TruncatePipe } from './truncate.pipe';
import { PublicviewComponent } from './publicview/publicview.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HomeComponent,
    NotfoundComponent,
    ForgotpasswordComponent,
    FooterComponent,
    PostPageComponent,
    EditPageComponent,
    ProfileComponent,
    TruncatePipe,
    PostDetailComponent,
    EditProfileComponent,
    PreviewComponent,
    PublicviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    // NgxEditorModule,
    TagInputModule,
    QuillModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
