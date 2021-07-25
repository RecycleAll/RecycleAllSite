import {Component, Input, OnInit} from '@angular/core';
import {Address} from "../../../../models/address.model";
import {Send} from "../../../../models/send.model";
import {ActivatedRoute, Router} from "@angular/router";
import {SendService} from "../../../../services/send.service";
import {AddressService} from "../../../../services/address.service";
import {Ordered} from "../../../../models/ordered.model";
import {OrderedService} from "../../../../services/ordered.service";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../models/user.model";
import {Product} from "../../../../models/product.model";
import {ProductsService} from "../../../../services/products.service";

@Component({
  selector: 'app-single-ordered',
  templateUrl: './single-ordered.component.html',
  styleUrls: ['./single-ordered.component.scss']
})
export class SingleOrderedComponent implements OnInit {

  address?: Address;
  send?: Send;
  user?: User;
  products: Product[] = [];

  @Input() order!: Ordered;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private orderedService: OrderedService,
              private addressService: AddressService,
              private sendService: SendService,
              private userService:UserService,
              private productService: ProductsService) {
  }

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];
    await this.initOrder(id);

    if (this.order.billing_address)
       this.address = await this.addressService.getOne(this.order.billing_address);

    if (this.order.send_id)
      this.send = await this.sendService.getOne(this.order.send_id);

    if (this.order.user_id)
      this.user = await this.userService.getOne(this.order.user_id);

    this.products = await  this.productService.getAllByOrder(this.order.id);

  }

  async initOrder(id: number) {
    this.order = await this.orderedService.getOne(id);
  }

  onUpdate() {
    this.router.navigate([`admin/ordered-update/${this.order.id}`])
  }

  async onDelete() {
    const isDelete = await this.orderedService.delete(this.order.id);
    if (isDelete) {
      this.router.navigate(['/admin/ordered'])
    } else {
      alert("Is not delete !");
    }
  }
}
