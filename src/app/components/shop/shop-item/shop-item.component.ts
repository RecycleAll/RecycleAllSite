import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../models/product.model";
import {ProductsService} from "../../../services/products.service";
import {AuthUserService} from "../../../services/auth-user.service";

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss']
})
export class ShopItemComponent implements OnInit {

  @Input() product!: Product;
  linkedProduct?: Product;
  isAuth!: boolean;
  isInCard!: boolean;

  constructor(private productsService: ProductsService,
              private authUserService: AuthUserService) {
  }

  async ngOnInit(): Promise<void> {
    if (this.product.piece_of)
      this.linkedProduct = await this.productsService.getOne(this.product.piece_of);
    this.isAuth = this.authUserService.isAuth();
    if (this.isAuth) {
      const index = this.authUserService.getSession()!.card.findIndex(x => x.id === this.product.id)
      this.isInCard = index !== -1;
    } else {
      this.isInCard = false;
    }
  }

  addToCard() {
    if (this.product.price) {
      this.authUserService.getSession()!.addToCard(this.product);
      this.isInCard = true;
    }
  }

  removeFromCard() {
    if (this.product.price) {
      this.authUserService.getSession()!.supprFromCard(this.product);
      this.isInCard = false;
    }
  }
}
