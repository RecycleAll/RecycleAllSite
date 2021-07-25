import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/product.model";
import {ActivatedRoute, Router} from "@angular/router";
import {EntrepotService} from "../../services/entrepot.service";
import {ProductsService} from "../../services/products.service";
import {MediaProduct} from "../../models/mediaProduct.model";
import {environment} from "../../../environments/environment";
import {MediaProductService} from "../../services/media-product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product !: Product;
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

    if( this.product.piece_of)
      this.linkedProduct = await this.productService.getOne(this.product.piece_of);

    const tmp = await this.mediaProductService.getAllByProduct(this.product.id);
    if(tmp){
      this.mediaProducts = tmp;
    }else{
      this.mediaProducts = [];
    }
  }

  async initProduct(id: number) {
    this.product = await this.productService.getOne(id);
  }


}
