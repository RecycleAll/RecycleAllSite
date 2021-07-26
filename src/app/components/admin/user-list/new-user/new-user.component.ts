import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthUserService} from "../../../../services/auth-user.service";
import {EntrepotService} from "../../../../services/entrepot.service";
import {Entrepot} from "../../../../models/entrepot.model";
import {Subscription} from "rxjs";
import {Address} from "../../../../models/address.model";
import {AddressService} from "../../../../services/address.service";
import {UserAddressService} from "../../../../services/user-address.service";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  userForm!: FormGroup;
  entrepots: Entrepot[] = [];

  address: Address[] = [];
  currentAddress?: Address;
  addedAddress: Address[] = [];

  constructor(private formBuilder: FormBuilder,
              private authUser: AuthUserService,
              private router: Router,
              private entrepotService: EntrepotService,
              private addressService: AddressService,
              private userAddressService: UserAddressService) {
  }

  async ngOnInit(): Promise<void> {
    await this.entrepotsFetch()
    this.entrepotService.entrepotSubject.subscribe(
      (entrepots: Entrepot[]) => {
        this.entrepots = entrepots;
      }
    )
    this.entrepotService.emitEntrepot();

    await this.addressFetch()
    this.addressService.addressSubject.subscribe(
      (address: Address[]) => {
        this.address = address;
      }
    )
    this.addressService.emitAddress();

    this.initForm();
  }

  async entrepotsFetch() {
    await this.entrepotService.getAll();
  }

  async addressFetch() {
    await this.addressService.getAll();
  }

  addAddress() {
    if(this.currentAddress) {
      let i = this.address.indexOf(this.currentAddress);
      if (i >= 0) {
        this.addedAddress.push(this.currentAddress);
        this.address.splice(i, 1);
      }
    }
  }

  setSelectAddress(address_id: string) {
    const id = Number(address_id);
    this.currentAddress = this.address.find(value => value.id === id);
  }

  removeAddress(address: Address){
    let i = this.addedAddress.indexOf(address);
    if(i>=0){
      this.address.push(address);
      this.addedAddress.splice(i, 1);
    }
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      entrepots: ['']
    });
  }

  async onSubmitForm() {
    const {firstname,lastname,email,password ,entrepots} = this.userForm.value;
    const user = await this.authUser.register({
      firstname,
      lastname,
      email,
      password,
      work_in: entrepots
    });
    if (user) {
      this.router.navigate(['/admin/user']);
    } else {
      alert("Error of creation");
    }
  }
}
