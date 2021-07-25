import { Component, OnInit } from '@angular/core';
import {Product} from "../../../../models/product.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductsService} from "../../../../services/products.service";
import {Entrepot} from "../../../../models/entrepot.model";
import {EntrepotService} from "../../../../services/entrepot.service";

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {

  product !: Product;
  entrepot?: Entrepot;
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

    if( this.product.entrepot_store_id)
      this.entrepot = await this.entrepotService.getOne(this.product.entrepot_store_id);

    if( this.product.piece_of)
      this.linkedProduct = await this.productService.getOne(this.product.piece_of);
  }

  async initProduct(id: number) {
    this.product = await this.productService.getOne(id);
  }

  onUpdate() {
    this.router.navigate([`admin/product-update/${this.product.id}`])
  }

  async onDelete() {
    const isDelete = await this.productService.delete(this.product.id);
    if (isDelete) {
      this.router.navigate(['/admin/product'])
    } else {
      alert("Is not delete !");
    }
  }

}
