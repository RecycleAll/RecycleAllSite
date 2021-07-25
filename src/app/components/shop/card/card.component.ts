import { Component, OnInit } from '@angular/core';
import {Product} from "../../../models/product.model";
import {ProductsService} from "../../../services/products.service";
import {AuthUserService} from "../../../services/auth-user.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  products: Product[] = []
  isAuth!: boolean;

  constructor( public authUserService:AuthUserService) { }

  async ngOnInit(): Promise<void> {
    this.isAuth = this.authUserService.isAuth();
  }

  async removeFromCard(product: Product) {
    this.authUserService.getSession()!.supprFromCard(product);
  }

  isInCard(product: Product) {
    const index = this.authUserService.getSession()!.card.findIndex(x => x.id === product.id)
    if (index != -1){
      return true
    }
    return false
  }

}
