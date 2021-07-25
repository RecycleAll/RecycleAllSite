import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../../models/product.model";
import {Router} from "@angular/router";
import {ProductsService} from "../../../services/products.service";
import {DonService} from "../../../services/don.service";
import {Session} from "../../../models/session.model";
import {AuthUserService} from "../../../services/auth-user.service";

@Component({
  selector: 'app-don-form',
  templateUrl: './don-form.component.html',
  styleUrls: ['./don-form.component.scss']
})
export class DonFormComponent implements OnInit {

  newProductForm!: FormGroup;
  products: Product[] = [];
  product!: Product;

  session?: Session;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private productService: ProductsService,
              private authUserSession: AuthUserService,
              private donService: DonService) {
  }

  async productFetch() {
    await this.productService.getAll();
  }

  async ngOnInit() {
    await this.productFetch();
    this.productService.productsSubject.subscribe(value => {
        this.products = value;
    });
    this.productService.emitProduct();

    if( this.authUserSession.isAuth() ){
      this.session = this.authUserSession.getSession();
    }

    this.initForm();
  }

  initForm() {
    this.newProductForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      serial_number: ['', [Validators.required]],
      piece_of: [null]
    });
  }

  async onSubmitForm() {
    const {name, description, serial_number, piece_of, entrepot_id} = this.newProductForm.value;

    if(!this.session){
      return
    }

    const don = await this.donService.create({
      user_id: this.session.user_id,
      coin_win:0,
      date: new Date()
    });

    if(!don){
      alert("Can't create Donation")
      return
    }

    console.log("donId: "+don.id);
    let args;
    if (piece_of) {
      args = {
        name,
        description,
        serial_number,
        price: undefined,
        piece_of,
        entrepot_store_id: entrepot_id,
        don_id:don.id
      }
    } else {
      args = {
        name,
        description,
        serial_number,
        price: undefined,
        entrepot_store_id: entrepot_id,
        don_id:don.id
      }
    }

    const prod = await this.productService.create(args);

    if(!prod){
      await this.donService.delete(don.id)
      alert("Can't create Donation")
      return
    }

    this.router.navigate(['/donation']);
  }

}
