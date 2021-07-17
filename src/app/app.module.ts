import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AuthUserService} from "./services/auth-user.service";
import { NavComponent } from './components/nav/nav.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ErrorAccessComponent } from './components/error-access/error-access.component';
import { HomeComponent } from './components/home/home.component';
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: '', component: HomeComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: 'not-found', component: ErrorAccessComponent},
  { path: '**', redirectTo: 'not-found'}
]

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SignupComponent,
    LoginComponent,
    ErrorAccessComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthUserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
