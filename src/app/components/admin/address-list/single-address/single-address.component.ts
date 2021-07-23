import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Address} from "../../../../models/address.model";
import {AddressService} from "../../../../services/address.service";

@Component({
  selector: 'app-single-address',
  templateUrl: './single-address.component.html',
  styleUrls: ['./single-address.component.scss']
})
export class SingleAddressComponent implements OnInit {

  address !: Address;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private addressService: AddressService) {
  }

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.params['id'];
    await this.initAddress(id);
  }

  async initAddress(id: number) {
    this.address = await this.addressService.getOne(id);
  }

  async onDelete() {
    const isDelete = await this.addressService.delete(this.address.id);
    if (isDelete) {
      this.router.navigate(['/admin/address'])
    } else {
      alert("Is not delete !");
    }
  }

  onUpdate() {
    this.router.navigate([`admin/address-update/${this.address.id}`])
  }

}
