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
import { DonViewComponent } from './components/don/don-view/don-view.component';
import { DonFormComponent } from './components/don/don-form/don-form.component';
import { ShopViewComponent } from './components/shop/shop-view/shop-view.component';
import { MyAccountViewComponent } from './components/my-account/my-account-view/my-account-view.component';
import { MyAccountUpdateComponent } from './components/my-account/my-account-update/my-account-update.component';
import {SessionService} from "./services/session.service";

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: '', component: HomeComponent},
  { path: 'donation', component: DonViewComponent},
  { path: 'donation/form', component: DonFormComponent},
  { path: 'shop', component: ShopViewComponent},
  { path: 'my-account', component: MyAccountViewComponent},
  { path: 'my-account/edit', component: MyAccountUpdateComponent},
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
    HomeComponent,
    DonViewComponent,
    DonFormComponent,
    ShopViewComponent,
    MyAccountViewComponent,
    MyAccountUpdateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthUserService,
    SessionService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
