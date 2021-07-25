import {Component, Input, OnInit} from '@angular/core';
import {Send} from "../../../../models/send.model";
import {Address} from "../../../../models/address.model";
import {AddressService} from "../../../../services/address.service";

@Component({
  selector: 'app-send-item',
  templateUrl: './send-item.component.html',
  styleUrls: ['./send-item.component.scss']
})
export class SendItemComponent implements OnInit {

  address?: Address;

  @Input() send!: Send;

  constructor(private addressService: AddressService) {
  }

  async ngOnInit() {
    if (this.send.delivery_address)
      this.address = await this.addressService.getOne(this.send.delivery_address);
  }


}
