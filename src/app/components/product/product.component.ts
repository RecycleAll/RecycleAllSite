import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/product.model";
import {ActivatedRoute, Router} from "@angular/router";
import {EntrepotService} from "../../services/entrepot.service";
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product !: Product;
  linkedProduct?: Product;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private entrepotService: EntrepotService,
              private productService: ProductsService
  ) {
  }

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.params['id'];
    await this.initProduct(id);

    if( this.product.piece_of)
      this.linkedProduct = await this.productService.getOne(this.product.piece_of);
  }

  async initProduct(id: number) {
    this.product = await this.productService.getOne(id);
  }


}
