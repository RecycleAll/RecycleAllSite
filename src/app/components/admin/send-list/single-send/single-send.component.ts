import {Component, Input, OnInit} from '@angular/core';
import {Address} from "../../../../models/address.model";
import {Send} from "../../../../models/send.model";
import {AddressService} from "../../../../services/address.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SendService} from "../../../../services/send.service";

@Component({
  selector: 'app-single-send',
  templateUrl: './single-send.component.html',
  styleUrls: ['./single-send.component.scss']
})
export class SingleSendComponent implements OnInit {

  address?: Address;

  @Input() send!: Send;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private sendService: SendService,
              private addressService: AddressService) {
  }

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];
    await this.initSend(id);

    if (this.send.delivery_address)
      this.address = await this.addressService.getOne(this.send.delivery_address);
  }

  async initSend(id: number) {
    this.send = await this.sendService.getOne(id);
  }

  onUpdate() {
    this.router.navigate([`admin/send-update/${this.send.id}`])
  }

  async onDelete() {
    const isDelete = await this.sendService.delete(this.send.id);
    if (isDelete) {
      this.router.navigate(['/admin/send'])
    } else {
      alert("Is not delete !");
    }
  }

}
