import {Component, Input, OnInit} from '@angular/core';
import {Entrepot} from "../../../../models/entrepot.model";
import {Address} from "../../../../models/address.model";
import {AddressService} from "../../../../services/address.service";

@Component({
  selector: 'app-entrepot-item',
  templateUrl: './entrepot-item.component.html',
  styleUrls: ['./entrepot-item.component.scss']
})
export class EntrepotItemComponent implements OnInit {

  address?: Address;

  @Input() entrepot!: Entrepot;
  constructor(private addressService: AddressService) {

  }

  ngOnInit(): void {
    this.addressService.getOne(this.entrepot.address_id).then(value => this.address = value);
  }

}
