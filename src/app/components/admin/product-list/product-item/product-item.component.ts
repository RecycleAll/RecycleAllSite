import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../../models/product.model";
import {EntrepotService} from "../../../../services/entrepot.service";
import {Entrepot} from "../../../../models/entrepot.model";
import {ProductsService} from "../../../../services/products.service";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  entrepot!: Entrepot;
  linkedProduct?: Product;

  @Input() product!: Product;
  constructor(private entrepotService: EntrepotService,
              private productService: ProductsService) {

  }

  async ngOnInit() {
    if( this.product.entrepot_store_id)
      this.entrepot = await this.entrepotService.getOne(this.product.entrepot_store_id);

    if( this.product.piece_of)
      this.linkedProduct = await this.productService.getOne(this.product.piece_of);

  }

}
