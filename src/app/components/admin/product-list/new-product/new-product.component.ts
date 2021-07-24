import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ProductsService} from "../../../../services/products.service";
import {Entrepot} from "../../../../models/entrepot.model";
import {EntrepotService} from "../../../../services/entrepot.service";
import {Product} from "../../../../models/product.model";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {

  newProductForm!: FormGroup;
  entrepots: Entrepot[] = [];
  products: Product[] = [];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private productService: ProductsService,
              private entrepotService: EntrepotService) {
  }

  async entrepotFetch() {
    await this.entrepotService.getAll();
  }

  async productFetch() {
    await this.productService.getAll();
  }

  async ngOnInit() {
    await this.entrepotFetch();
    this.entrepotService.entrepotSubject.subscribe(value => {
      this.entrepots = value;
    });
    this.entrepotService.emitEntrepot();

    await this.productFetch();
    this.productService.productsSubject.subscribe(value => {
      if(value !== undefined) {
        this.products = value;
      }
      else{
        this.products = [];
      }
      console.log(this.products);
    });
    this.productService.emitProduct();

    this.initForm();
  }

  initForm() {
    this.newProductForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      serial_number: ['', [Validators.required]],
      price: ['', [Validators.required]],
      piece_of: [null],
      entrepot_id: [null]
    });
  }

  async onSubmitForm() {
    const {name, description, serial_number, price, piece_of, entrepot_id} = this.newProductForm.value;

    let args;
    if (piece_of) {
      args = {
        name,
        description,
        serial_number,
        price,
        piece_of,
        entrepot_store_id: entrepot_id
      }
    } else {
      args = {
        name,
        description,
        serial_number,
        price,
        entrepot_store_id: entrepot_id
      }
    }

    await this.productService.create(args);

    this.router.navigate(['/admin/product']);
  }

}
