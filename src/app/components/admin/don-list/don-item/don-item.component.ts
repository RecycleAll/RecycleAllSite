import {Component, Input, OnInit} from '@angular/core';
import {Don} from "../../../../models/don.model";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../models/user.model";
import {Product} from "../../../../models/product.model";
import {DonProductService} from "../../../../services/don-product.service";
import {ProductsService} from "../../../../services/products.service";

@Component({
  selector: 'app-don-item',
  templateUrl: './don-item.component.html',
  styleUrls: ['./don-item.component.scss']
})
export class DonItemComponent implements OnInit {

  user?: User;
  products: Product[] = [];

  @Input() don!: Don;
  constructor(private userService: UserService,
              private donProductService: DonProductService,
              private productService: ProductsService) {
  }

  async ngOnInit() {
    if( this.don.user_id)
      this.user = await this.userService.getOne(this.don.user_id);

    const donProd = await this.donProductService.getAllByDon(this.don.id);

    for(let dp of donProd){
      this.products.push( await this.productService.getOne(dp.product_id));
    }
  }

}
