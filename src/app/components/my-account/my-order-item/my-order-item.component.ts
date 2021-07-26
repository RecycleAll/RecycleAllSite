import {Component, Input, OnInit} from '@angular/core';
import {Ordered} from "../../../models/ordered.model";
import {Product} from "../../../models/product.model";
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../../services/products.service";
import {Address} from "../../../models/address.model";
import {AddressService} from "../../../services/address.service";

@Component({
  selector: 'app-my-order-item',
  templateUrl: './my-order-item.component.html',
  styleUrls: ['./my-order-item.component.scss']
})
export class MyOrderItemComponent implements OnInit {

  @Input() order!: Ordered;
  products: Product[] = [];
  address!: Address ;


  constructor(private productService:ProductsService,
              private route: ActivatedRoute,
              private addressService:AddressService) { }


  async ngOnInit() {
    const id = this.route.snapshot.params['id'];

    if (this.order.billing_address)
      this.address = await this.addressService.getOne(this.order.billing_address);

    this.products = await  this.productService.getAllByOrder(this.order.id);

  }

}
