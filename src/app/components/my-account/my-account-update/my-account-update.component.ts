import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/user.model";
import {AuthUserService} from "../../../services/auth-user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {Session} from "../../../models/session.model";
import {Address, AddressCreation} from "../../../models/address.model";
import {UserAddressService} from "../../../services/user-address.service";
import {AddressService} from "../../../services/address.service";


interface AddressItem{
  userAddressId: number,
  address: Address
}

@Component({
  selector: 'app-my-account-update',
  templateUrl: './my-account-update.component.html',
  styleUrls: ['./my-account-update.component.scss']
})
export class MyAccountUpdateComponent implements OnInit {

  userForm!: FormGroup;
  addressForm!: FormGroup;
  activeSession?: Session;
  user?: User;

  displayNewAddressForm: boolean = false;

  address: AddressItem[] = [];
  removedAddress: AddressItem[] = [];
  newAddress: AddressCreation[] = [];

  constructor(private formBuilder: FormBuilder,
              private authUserService: AuthUserService,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private addressService: AddressService,
              private userAddressService: UserAddressService) {
  }

  async ngOnInit() {

    this.authUserService.sessionSubject.subscribe(async (session: Session) => {
        this.activeSession = session;
        this.user = await this.userService.getOne(this.activeSession.user_id);

        let userAddresses = await this.userAddressService.getAllByUser(this.user.id);

        for(let ua of userAddresses){
          let address;
          if(ua.address_id)
            address = await this.addressService.getOne(ua.address_id);

          if(address)
            this.address.push({
              userAddressId: ua.id,
              address
            });
        }

        this.userForm = this.formBuilder.group({
          firstname: [this.user?.firstname, [Validators.required]],
          lastname: [this.user?.lastname, [Validators.required]],
          email: [this.user?.email, [Validators.required, Validators.email]],
          oldpassword: [undefined, [Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
          newpassword: [undefined, [Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
        });
      }
    )
    this.authUserService.emitSession();

    this.addressForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      number: ['', [Validators.required]],
      way: ['', [Validators.required]],
      complement_way: [''],
      postal_code: ['', [Validators.required]],
      city: ['', [Validators.required]]
    });
  }

  onAddNewAddress(){
    this.displayNewAddressForm = true;
  }

  onCancelNewAddress(){
    this.displayNewAddressForm = false;
  }

  async onSubmitAddressForm(){
    const {name, number, way, complement_way, postal_code, city} = this.addressForm.value;
    this.newAddress.push({
      city,
      complement_way,
      name,
      number,
      postal_code,
      way
    });
    this.displayNewAddressForm = false;
  }

  async removeAddress(addressItem: AddressItem){
    let i = this.address.indexOf(addressItem);
    if(i>=0){
      this.removedAddress.push(this.address[i]);
      this.address.splice(i, 1);
    }
  }

  removeAddress2(address: AddressCreation){
    let i = this.newAddress.indexOf(address);
    if(i>=0){
      this.newAddress.splice(i, 1);
    }
  }

  async onSubmitForm() {
    let {firstname, lastname, email, newpassword, oldpassword} = this.userForm.value;

    if (!this.activeSession || !this.user) {
      return;
    }

    if (newpassword) {
      if (!oldpassword) {
        alert("enter your password");
        return;
      }
      if (!await this.authUserService.logIn(this.user.email, oldpassword)) {
        alert("wrong password");
        return;
      }
    } else {
      newpassword = undefined;
    }

    const res = await this.authUserService.update({
      id: this.user.id,
      firstname,
      lastname,
      email,
      recycle_coins: this.user.recycle_coins,
      password: newpassword
    });

    if (res !== null) {

      for(let na of this.newAddress) {
        const address = await this.addressService.create(na);

        if (address !== null) {
          let userAddress = await this.userAddressService.create({
            address_id: address.id,
            user_id: this.user?.id
          })

          if (!userAddress) {
            alert("Error of creation");
            await this.addressService.delete(address.id);
            return;
          }

          this.address.push({
            userAddressId: userAddress.id,
            address
          });
          this.displayNewAddressForm = false;

        } else {
          alert("Error of creation");
        }
      }

      for(let na of this.removedAddress){
        await this.userAddressService.delete(na.userAddressId);
      }

      this.router.navigate(['/my-account']);
    } else {
      alert("Error of update");
    }
  }

}
