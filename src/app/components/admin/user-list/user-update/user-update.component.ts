import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Entrepot} from "../../../../models/entrepot.model";
import {Subscription} from "rxjs";
import {AuthUserService} from "../../../../services/auth-user.service";
import {EntrepotService} from "../../../../services/entrepot.service";
import {User} from "../../../../models/user.model";
import {UserService} from "../../../../services/user.service";
import {Address} from "../../../../models/address.model";
import {AddressService} from "../../../../services/address.service";
import {UserAddressService} from "../../../../services/user-address.service";

interface AddressItem {
  userAddressId?: number,
  address: Address
}

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  userForm!: FormGroup;
  entrepots: Entrepot[] = [];
  entrepotsSubscription!: Subscription;
  user!: User;

  allAddress: AddressItem[] = [];
  currentAddress?: AddressItem;

  userAddress: AddressItem[] = [];
  addedAddress: AddressItem[] = [];
  removedAddress: AddressItem[] = [];

  constructor(private formBuilder: FormBuilder,
              private authUser: AuthUserService,
              private router: Router,
              private entrepotService: EntrepotService,
              private route: ActivatedRoute,
              private userService: UserService,
              private addressService: AddressService,
              private userAddressService: UserAddressService) {
  }

  async ngOnInit(): Promise<void> {
    await this.entrepotsFetch()
    this.entrepotsSubscription = this.entrepotService.entrepotSubject.subscribe(
      (entrepots: Entrepot[]) => {
        this.entrepots = entrepots;
      }
    )
    this.entrepotService.emitEntrepot();

    await this.addressFetch()
    this.addressService.addressSubject.subscribe(
      (address: Address[]) => {
        this.allAddress = address.map(value => {
          return {
            address: value,
          }
        });
      }
    )
    this.addressService.emitAddress();

    const id = this.route.snapshot.params['id'];
    await this.initUser(id);
    this.initForm();
  }

  async initUser(id: number) {
    this.user = await this.userService.getOne(id);

    let userAddresses = await this.userAddressService.getAllByUser(this.user.id);
    for (let ua of userAddresses) {
      let i = this.allAddress.findIndex(value => value.address.id === ua.address_id);
      if(i >= 0){
        this.allAddress[i].userAddressId = ua.id;
        this.userAddress.push( this.allAddress[i]);
        this.allAddress.splice(i, 1);
      }
    }
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      firstname: [this.user.firstname, [Validators.required]],
      lastname: [this.user.lastname, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      newpassword: ['', [Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      entrepots: [this.user.work_in]
    });
  }

  async entrepotsFetch() {
    await this.entrepotService.getAll();
  }

  async addressFetch() {
    await this.addressService.getAll();
  }

  addAddress() {
    if (this.currentAddress) {

      let i = this.allAddress.indexOf(this.currentAddress);
      if (i >= 0) {
        this.addedAddress.push(this.currentAddress);
        this.allAddress.splice(i, 1);
      }else{

        i = this.removedAddress.indexOf(this.currentAddress);
        if (i >= 0) {
          this.userAddress.push(this.currentAddress);
          this.removedAddress.splice(i, 1);
        }
      }
    }
  }

  setSelectAddress(address_id: string) {
    const id = Number(address_id);
    this.currentAddress = this.allAddress.find(value => value.address.id === id);
    if(!this.currentAddress){
      this.currentAddress = this.removedAddress.find(value => value.address.id === id);
    }
  }

  removeAddress(address: AddressItem) {
    let i = this.addedAddress.indexOf(address);
    if (i >= 0) {
      this.allAddress.push(address);
      this.addedAddress.splice(i, 1);
    }
  }

  removeAddress2(address: AddressItem) {
    let i = this.userAddress.indexOf(address);
    if (i >= 0) {
      this.removedAddress.push(address);
      this.userAddress.splice(i, 1);
    }
  }


  async onSubmitForm() {
    let {firstname, lastname, email, newpassword, entrepots} = this.userForm.value;
    if (newpassword !== '') {
      const res = await this.authUser.update({
        id: this.user.id,
        firstname,
        lastname,
        email,
        recycle_coins: this.user.recycle_coins,
        password: newpassword,
        work_in: entrepots
      });
      if (res !== null) {
        this.router.navigate(['/admin/user']);
      } else {
        alert("Error of update");
      }
    } else {
      newpassword = undefined;
      const res = await this.authUser.update({
        id: this.user.id,
        firstname,
        lastname,
        email,
        recycle_coins: this.user.recycle_coins,
        password: newpassword,
        work_in: entrepots
      });

      if (res !== null) {

        for(let a of this.addedAddress){
          if(!a.userAddressId){
            await this.userAddressService.create({
              user_id: this.user.id,
              address_id: a.address.id
            })
          }
        }

        for(let a of this.removedAddress){
          if(a.userAddressId){
            await this.userAddressService.delete(a.userAddressId);
          }
        }

        this.router.navigate(['/admin/user']);
      } else {
        alert("Error of update");
      }
    }
  }

}
