import {Component, Input, OnInit} from '@angular/core';
import {Address} from "../../../../models/address.model";
import {Send} from "../../../../models/send.model";
import {AddressService} from "../../../../services/address.service";
import {Ordered} from "../../../../models/ordered.model";
import {SendService} from "../../../../services/send.service";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../models/user.model";

@Component({
  selector: 'app-ordered-item',
  templateUrl: './ordered-item.component.html',
  styleUrls: ['./ordered-item.component.scss']
})
export class OrderedItemComponent implements OnInit {

  address?: Address;
  send?: Send;
  user?: User;

  @Input() ordered!: Ordered;

  constructor(private addressService: AddressService,
              private sendService: SendService,
              private userService: UserService) {
  }

  async ngOnInit() {
    if (this.ordered.billing_address)
      this.address = await this.addressService.getOne(this.ordered.billing_address);

    if (this.ordered.send_id)
      this.send = await this.sendService.getOne(this.ordered.send_id);

    if (this.ordered.user_id)
      this.user = await this.userService.getOne(this.ordered.user_id);
  }


}
