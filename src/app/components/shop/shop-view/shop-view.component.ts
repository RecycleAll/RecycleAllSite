import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../../services/products.service";
import {Product} from "../../../models/product.model";

@Component({
  selector: 'app-shop-view',
  templateUrl: './shop-view.component.html',
  styleUrls: ['./shop-view.component.scss']
})
export class ShopViewComponent implements OnInit {

  products: Product[] = []

  constructor(private productService: ProductsService) { }

  async ngOnInit(): Promise<void> {
    await this.productFetch();
    this.products = await this.productService.getAllAvailable();
  }

  async productFetch() {
    await this.productService.getAll();
  }

}
