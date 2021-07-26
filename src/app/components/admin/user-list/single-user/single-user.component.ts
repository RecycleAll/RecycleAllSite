import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../models/user.model";
import {AddressService} from "../../../../services/address.service";
import {UserAddressService} from "../../../../services/user-address.service";
import {Address} from "../../../../models/address.model";
import {Entrepot} from "../../../../models/entrepot.model";

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent implements OnInit {

  user !: User;
  entrepots: Entrepot[] = [];
  address: Address[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private addressService: AddressService,
              private userAddressService: UserAddressService) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.params['id'];
    await this.initUser(id);
  }

  async initUser(id: number) {
    this.user = await this.userService.getOne(id);

    let userAddresses = await this.userAddressService.getAllByUser(this.user.id);
    for (let ua of userAddresses) {
      if(ua.address_id) {
        let a = (await this.addressService.getOne(ua.address_id))
        if (a)
          this.address.push(a);
      }
    }
  }

  async onDelete() {
    const isDelete = await this.userService.delete(this.user.id);
    if (isDelete) {
      this.router.navigate(['/admin/user'])
    } else {
      alert("Is not delete !");
    }
  }

  onUpdate() {
    this.router.navigate([`admin/user-update/${this.user.id}`])
  }

}
