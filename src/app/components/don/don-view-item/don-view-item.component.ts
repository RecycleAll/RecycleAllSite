import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../models/user.model";
import {Don} from "../../../models/don.model";
import {UserService} from "../../../services/user.service";
import {Product} from "../../../models/product.model";
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
              private productService: ProductsService) {
  }

  async ngOnInit() {
    if( this.don.user_id)
      this.user = await this.userService.getOne(this.don.user_id);

      this.products = await this.productService.getAllByDon( this.don.id);
  }


}
