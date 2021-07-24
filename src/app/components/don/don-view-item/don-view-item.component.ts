import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../models/user.model";
import {Don} from "../../../models/don.model";
import {UserService} from "../../../services/user.service";
import {Product} from "../../../models/product.model";
import {DonProductService} from "../../../services/don-product.service";
import {ProductsService} from "../../../services/products.service";

@Component({
  selector: 'app-don-view-item',
  templateUrl: './don-view-item.component.html',
  styleUrls: ['./don-view-item.component.scss']
})
export class DonViewItemComponent implements OnInit {

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

    const donProd = await this.donProductService.getAllByDon( this.don.id);

    for(let dp of donProd){
      this.products.push( await this.productService.getOne(dp.product_id));
    }
  }


}
