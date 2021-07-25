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
import { UserItemComponent } from './components/admin/user-list/user-item/user-item.component';
import { MediaTypeItemComponent } from './components/admin/media-type-list/media-type-item/media-type-item.component';
import { SendItemComponent } from './components/admin/send-list/send-item/send-item.component';
import { ProductItemComponent } from './components/admin/product-list/product-item/product-item.component';
import { OrderedItemComponent } from './components/admin/ordered-list/ordered-item/ordered-item.component';
import { MediaItemComponent } from './components/admin/media-list/media-item/media-item.component';
import { EntrepotItemComponent } from './components/admin/entrepot-list/entrepot-item/entrepot-item.component';
import { AddressItemComponent } from './components/admin/address-list/address-item/address-item.component';
import { DonListComponent } from './components/admin/don-list/don-list.component';
import { SingleDonComponent } from './components/admin/don-list/single-don/single-don.component';
import { DonUpdateComponent } from './components/admin/don-list/don-update/don-update.component';
import { DonItemComponent } from './components/admin/don-list/don-item/don-item.component';
import { DonViewItemComponent } from './components/don/don-view-item/don-view-item.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ProductComponent } from './components/product/product.component';
import { CardComponent } from './components/shop/card/card.component';
import {AdminGuardService} from "./services/admin-guard.service";
import {MediaProductService} from "./services/media-product.service";
import { ShopItemComponent } from './components/shop/shop-item/shop-item.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: '', component: HomeComponent},
  { path: 'donation', component: DonViewComponent, canActivate: [AuthGuardService]},
  { path: 'donation/form', component: DonFormComponent, canActivate: [AuthGuardService]},
  { path: 'shop', component: ShopViewComponent},
  { path: 'cart', component: CardComponent, canActivate: [AuthGuardService]},
  { path: 'my-account', component: MyAccountViewComponent, canActivate: [AuthGuardService]},
  { path: 'my-account/edit', component: MyAccountUpdateComponent, canActivate: [AuthGuardService]},
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'product/:id', component: ProductComponent},
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuardService]},
  { path: 'admin', component: AdminHomeComponent, canActivate: [AdminGuardService]},
  { path: 'admin/address', component: AddressListComponent, canActivate: [AdminGuardService]},
  { path: 'admin/address/:id', component: SingleAddressComponent, canActivate: [AdminGuardService]},
  { path: 'admin/address-update/:id', component: AddressUpdateComponent, canActivate: [AdminGuardService]},
  { path: 'admin/new-address', component: NewAddressComponent, canActivate: [AdminGuardService]},
  { path: 'admin/entrepot', component: EntrepotListComponent, canActivate: [AdminGuardService]},
  { path: 'admin/entrepot/:id', component: SingleEntrepotComponent, canActivate: [AdminGuardService]},
  { path: 'admin/entrepot-update/:id', component: EntrepotUpdateComponent, canActivate: [AdminGuardService]},
  { path: 'admin/new-entrepot', component: NewEntrepotComponent, canActivate: [AdminGuardService]},
  { path: 'admin/media', component: MediaListComponent, canActivate: [AdminGuardService]},
  { path: 'admin/media/:id', component: SingleMediaComponent, canActivate: [AdminGuardService]},
  { path: 'admin/media-update/:id', component: MediaUpdateComponent, canActivate: [AdminGuardService]},
  { path: 'admin/new-media', component: NewMediaComponent, canActivate: [AdminGuardService]},
  { path: 'admin/media-type', component: MediaTypeListComponent, canActivate: [AdminGuardService]},
  { path: 'admin/media-type/:id', component: SingleMediaTypeComponent, canActivate: [AdminGuardService]},
  { path: 'admin/media-type-update/:id', component: MediaTypeUpdateComponent, canActivate: [AdminGuardService]},
  { path: 'admin/new-media-type', component: NewMediaTypeComponent, canActivate: [AdminGuardService]},
  { path: 'admin/ordered', component: OrderedListComponent, canActivate: [AdminGuardService]},
  { path: 'admin/ordered/:id', component: SingleOrderedComponent, canActivate: [AdminGuardService]},
  { path: 'admin/ordered-update/:id', component: OrderedUpdateComponent, canActivate: [AdminGuardService]},
  { path: 'admin/product', component: ProductListComponent, canActivate: [AdminGuardService]},
  { path: 'admin/product/:id', component: SingleProductComponent, canActivate: [AdminGuardService]},
  { path: 'admin/product-update/:id', component: ProductUpdateComponent, canActivate: [AdminGuardService]},
  { path: 'admin/new-product', component: NewProductComponent, canActivate: [AdminGuardService]},
  { path: 'admin/send', component: SendListComponent, canActivate: [AdminGuardService]},
  { path: 'admin/send/:id', component: SingleSendComponent, canActivate: [AdminGuardService]},
  { path: 'admin/send-update/:id', component: SendUpdateComponent, canActivate: [AdminGuardService]},
  { path: 'admin/don', component: DonListComponent, canActivate: [AdminGuardService]},
  { path: 'admin/don/:id', component: SingleDonComponent, canActivate: [AdminGuardService]},
  { path: 'admin/don-update/:id', component: DonUpdateComponent, canActivate: [AdminGuardService]},
  { path: 'admin/user', component: UserListComponent, canActivate: [AdminGuardService]},
  { path: 'admin/user/:id', component: SingleUserComponent, canActivate: [AdminGuardService]},
  { path: 'admin/user-update/:id', component: UserUpdateComponent, canActivate: [AdminGuardService]},
  { path: 'admin/new-user', component: NewUserComponent, canActivate: [AdminGuardService]},
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
    AdminHomeComponent,
    UserItemComponent,
    MediaTypeItemComponent,
    SendItemComponent,
    ProductItemComponent,
    OrderedItemComponent,
    MediaItemComponent,
    EntrepotItemComponent,
    AddressItemComponent,
    DonListComponent,
    SingleDonComponent,
    DonUpdateComponent,
    DonItemComponent,
    DonViewItemComponent,
    ProductComponent,
    CardComponent,
    ShopItemComponent
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
    SendService,
    AdminGuardService,
    MediaProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(localeFr, 'fr');
  }
}
