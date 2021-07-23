import {Component, OnInit} from '@angular/core';
import {AddressService} from "../../../services/address.service";
import {Subscription} from "rxjs";
import {Address} from "../../../models/address.model";

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {

  addresses: Address[] = [];
  addressesSubscription!: Subscription;

  constructor(private addressService: AddressService) {}

  async ngOnInit(): Promise<void> {
    await this.addressesFetch();
    this.addressesSubscription = this.addressService.addressSubject.subscribe(
      (adresses: Address[]) => {
        this.addresses = adresses;
      }
    );
    this.addressService.emitAddress();
  }

  async addressesFetch() {
    await this.addressService.getAll();
  }

}
