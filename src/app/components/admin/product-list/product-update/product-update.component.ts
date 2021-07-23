import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product, ProductCreation} from "../../../../models/product.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductsService} from "../../../../services/products.service";
import {Entrepot} from "../../../../models/entrepot.model";
import {EntrepotService} from "../../../../services/entrepot.service";

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {

  productForm!: FormGroup;
  product!: Product;
  entrepots: Entrepot[] = [];
  products: Product[] = [];

  constructor(private formBuilder: FormBuilder,
              private productService: ProductsService,
              private entrepotService: EntrepotService,
              private route: ActivatedRoute,
              private router: Router) { }

  async entrepotFetch() {
    await this.entrepotService.getAll();
  }

  async productFetch() {
    await this.productService.getAll();
  }

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.params['id'];
    await this.initProduct(id);

    await this.entrepotFetch();
    this.entrepotService.entrepotSubject.subscribe(value => {
      this.entrepots = value;
    });
    this.entrepotService.emitEntrepot();

    await this.productFetch();
    this.productService.productsSubject.subscribe(value => {
      this.products = value;
    });
    this.productService.emitProduct();

    this.initForm();
  }

  async initProduct(id: number) {
    this.product = await this.productService.getOne(id);
  }

  initForm() {
    this.productForm = this.formBuilder.group({
      name: [this.product.name, [Validators.required]],
      description: [this.product.description, [Validators.required]],
      serial_number: [this.product.serial_number, [Validators.required]],
      price: [this.product.price, [Validators.required]],
      piece_of: [this.product.piece_of],
      entrepot_id: [this.product.entrepot_store_id]
    });
  }

  async onSubmitForm() {
    let {name, description, serial_number, price, piece_of, entrepot_id} = this.productForm.value;

    if (piece_of !== null && piece_of.length <= 0) {
      piece_of = null;
    }

    if (entrepot_id !== null && entrepot_id.length <= 0) {
      entrepot_id = null;
    }

    const res = await this.productService.update( {
      id: this.product.id,
      name,
      description,
      serial_number,
      price,
      piece_of,
      entrepot_store_id: entrepot_id
    });

    if (res !== null){
      this.router.navigate(['/admin/product']);
    }else{
      alert("Error of update");
    }
  }

}
