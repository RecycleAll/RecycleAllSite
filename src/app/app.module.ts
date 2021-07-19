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
import {AuthGuardService} from "./services/auth-guard.service";
import { ProfilComponent } from './components/profil/profil.component';
import {UserService} from "./services/user.service";
import {ProductsService} from "./services/products.service";
import { SideBarComponent } from './components/admin/side-bar/side-bar.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { SingleUserComponent } from './components/admin/user-list/single-user/single-user.component';
import { NewUserComponent } from './components/admin/user-list/new-user/new-user.component';
import { UserUpdateComponent } from './components/admin/user-list/user-update/user-update.component';
import { ProductListComponent } from './components/admin/product-list/product-list.component';
import { SingleProductComponent } from './components/admin/product-list/single-product/single-product.component';
import { ProductUpdateComponent } from './components/admin/product-list/product-update/product-update.component';
import { SingleEntrepotComponent } from './components/admin/entrepot-list/single-entrepot/single-entrepot.component';
import { EntrepotUpdateComponent } from './components/admin/entrepot-list/entrepot-update/entrepot-update.component';
import { OrderedListComponent } from './components/admin/ordered-list/ordered-list.component';
import { SingleOrderedComponent } from './components/admin/ordered-list/single-ordered/single-ordered.component';
import { OrderedUpdateComponent } from './components/admin/ordered-list/ordered-update/ordered-update.component';
import { SendListComponent } from './components/admin/send-list/send-list.component';
import { SingleSendComponent } from './components/admin/send-list/single-send/single-send.component';
import { SendUpdateComponent } from './components/admin/send-list/send-update/send-update.component';
import { AddressListComponent } from './components/admin/address-list/address-list.component';
import { NewAddressComponent } from './components/admin/address-list/new-address/new-address.component';
import { SingleAddressComponent } from './components/admin/address-list/single-address/single-address.component';
import { AddressUpdateComponent } from './components/admin/address-list/address-update/address-update.component';
import { NewEntrepotComponent } from './components/admin/entrepot-list/new-entrepot/new-entrepot.component';
import { NewProductComponent } from './components/admin/product-list/new-product/new-product.component';
import { MediaTypeListComponent } from './components/admin/media-type-list/media-type-list.component';
import { NewMediaTypeComponent } from './components/admin/media-type-list/new-media-type/new-media-type.component';
import { SingleMediaTypeComponent } from './components/admin/media-type-list/single-media-type/single-media-type.component';
import { MediaTypeUpdateComponent } from './components/admin/media-type-list/media-type-update/media-type-update.component';
import { MediaListComponent } from './components/admin/media-list/media-list.component';
import { NewMediaComponent } from './components/admin/media-list/new-media/new-media.component';
import { SingleMediaComponent } from './components/admin/media-list/single-media/single-media.component';
import { MediaUpdateComponent } from './components/admin/media-list/media-update/media-update.component';
import {EntrepotListComponent} from "./components/admin/entrepot-list/entrepot-list.component";
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import {AddressService} from "./services/address.service";
import {EntrepotService} from "./services/entrepot.service";
import {MediaService} from "./services/media.service";
import {MediaTypeService} from "./services/media-type.service";
import {OrderedService} from "./services/ordered.service";
import {SendService} from "./services/send.service";

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
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuardService]},
  { path: 'admin', component: AdminHomeComponent},
  { path: 'admin/address', component: AddressListComponent},
  { path: 'admin/address/:id', component: SingleAddressComponent},
  { path: 'admin/address-update/:id', component: AddressUpdateComponent},
  { path: 'admin/new-address', component: NewAddressComponent},
  { path: 'admin/entrepot', component: EntrepotListComponent},
  { path: 'admin/entrepot/:id', component: SingleEntrepotComponent},
  { path: 'admin/entrepot-update/:id', component: EntrepotUpdateComponent},
  { path: 'admin/new-entrepot', component: NewEntrepotComponent},
  { path: 'admin/media', component: MediaListComponent},
  { path: 'admin/media/:id', component: SingleMediaComponent},
  { path: 'admin/media-update/:id', component: MediaUpdateComponent},
  { path: 'admin/new-media', component: NewMediaComponent},
  { path: 'admin/media-type', component: MediaTypeListComponent},
  { path: 'admin/media-type/:id', component: SingleMediaTypeComponent},
  { path: 'admin/media-type-update/:id', component: MediaTypeUpdateComponent},
  { path: 'admin/new-media-type', component: NewMediaTypeComponent},
  { path: 'admin/ordered', component: OrderedListComponent},
  { path: 'admin/ordered/:id', component: SingleOrderedComponent},
  { path: 'admin/ordered-update/:id', component: OrderedUpdateComponent},
  { path: 'admin/product', component: ProductListComponent},
  { path: 'admin/product/:id', component: SingleProductComponent},
  { path: 'admin/product-update/:id', component: ProductUpdateComponent},
  { path: 'admin/new-product', component: NewProductComponent},
  { path: 'admin/send', component: SendListComponent},
  { path: 'admin/send/:id', component: SingleSendComponent},
  { path: 'admin/send-update/:id', component: SendUpdateComponent},
  { path: 'admin/user', component: UserListComponent},
  { path: 'admin/user/:id', component: SingleUserComponent},
  { path: 'admin/user-update/:id', component: UserUpdateComponent},
  { path: 'admin/new-user', component: NewUserComponent},
  { path: 'not-found', component: ErrorAccessComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
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
    MyAccountUpdateComponent,
    ProfilComponent,
    SideBarComponent,
    UserListComponent,
    SingleUserComponent,
    NewUserComponent,
    UserUpdateComponent,
    ProductListComponent,
    SingleProductComponent,
    ProductUpdateComponent,
    EntrepotListComponent,
    SingleEntrepotComponent,
    EntrepotUpdateComponent,
    OrderedListComponent,
    SingleOrderedComponent,
    OrderedUpdateComponent,
    SendListComponent,
    SingleSendComponent,
    SendUpdateComponent,
    AddressListComponent,
    NewAddressComponent,
    SingleAddressComponent,
    AddressUpdateComponent,
    NewEntrepotComponent,
    NewProductComponent,
    MediaTypeListComponent,
    NewMediaTypeComponent,
    SingleMediaTypeComponent,
    MediaTypeUpdateComponent,
    MediaListComponent,
    NewMediaComponent,
    SingleMediaComponent,
    MediaUpdateComponent,
    AdminHomeComponent
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
    AuthGuardService,
    UserService,
    ProductsService,
    AddressService,
    EntrepotService,
    MediaService,
    MediaTypeService,
    OrderedService,
    SendService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
