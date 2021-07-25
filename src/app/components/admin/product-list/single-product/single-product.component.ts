import { Component, OnInit } from '@angular/core';
import {Product} from "../../../../models/product.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductsService} from "../../../../services/products.service";
import {Entrepot} from "../../../../models/entrepot.model";
import {EntrepotService} from "../../../../services/entrepot.service";
import {MediaProductService} from "../../../../services/media-product.service";
import {environment} from "../../../../../environments/environment";
import {MediaProduct} from "../../../../models/mediaProduct.model";

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {

  product !: Product;
  entrepot?: Entrepot;
  linkedProduct?: Product;

  mediaProducts: MediaProduct[] = [];
  mediaPath = environment.API_URL + "media/file/";

  constructor(private router: Router,
              private route: ActivatedRoute,
              private entrepotService: EntrepotService,
              private productService: ProductsService,
              private mediaProductService: MediaProductService
  ) {
  }

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.params['id'];
    await this.initProduct(id);
  }

  async initProduct(id: number) {
    this.product = await this.productService.getOne(id);

    if( this.product.entrepot_store_id)
      this.entrepot = await this.entrepotService.getOne(this.product.entrepot_store_id);

    if( this.product.piece_of)
      this.linkedProduct = await this.productService.getOne(this.product.piece_of);

    const tmp = await this.mediaProductService.getAllByProduct(this.product.id);
    if(tmp){
      this.mediaProducts = tmp;
    }else{
      this.mediaProducts = [];
    }
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
