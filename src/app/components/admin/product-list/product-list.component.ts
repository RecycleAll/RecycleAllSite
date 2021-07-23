import { Component, OnInit } from '@angular/core';
import {Product} from "../../../models/product.model";
import {ProductsService} from "../../../services/products.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = []

  constructor(private productService: ProductsService) { }

  async ngOnInit(): Promise<void> {
    await this.productFetch();
    this.productService.productsSubject.subscribe(
      (products: Product[]) => {
        this.products = products;
      }
    )
    this.productService.emitProduct();
  }

  async productFetch() {
    await this.productService.getAll();
  }

}
