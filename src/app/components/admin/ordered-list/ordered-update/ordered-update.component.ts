import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SendService} from "../../../../services/send.service";
import {AddressService} from "../../../../services/address.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Address} from "../../../../models/address.model";
import {Ordered} from "../../../../models/ordered.model";
import {Send} from "../../../../models/send.model";
import {User} from "../../../../models/user.model";
import {UserService} from "../../../../services/user.service";
import {OrderedService} from "../../../../services/ordered.service";
import {Product} from "../../../../models/product.model";
import {ProductsService} from "../../../../services/products.service";
import {formatDate} from "@angular/common";
import {dateToStringForms} from "../../../../utils/dateutils";

@Component({
  selector: 'app-ordered-update',
  templateUrl: './ordered-update.component.html',
  styleUrls: ['./ordered-update.component.scss']
})
export class OrderedUpdateComponent implements OnInit {


  orderForm!: FormGroup;
  order!: Ordered;
  address: Address[] = [];
  sends: Send[] = [];
  users: User[] = [];

  selectedProduct: Product[] = [];
  removedProduct: Product[] = [];
  addedProduct: Product[] = [];
  availableProducts: Product[] = [];
  currentProduct?: Product;

  constructor(private formBuilder: FormBuilder,
              private orderedService: OrderedService,
              private sendService: SendService,
              private addressService: AddressService,
              private userService: UserService,
              private productService: ProductsService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  async addressFetch() {
    await this.addressService.getAll();
  }

  async sendFetch() {
    await this.sendService.getAll();
  }

  async userFetch() {
    await this.userService.getAll();
  }

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];
    await this.initOrder(id);

    await this.addressFetch();
    this.addressService.addressSubject.subscribe(value => {
      this.address = value;
    });
    this.addressService.emitAddress();

    await this.sendFetch();
    this.sendService.sendSubject.subscribe(value => {
      this.sends = value;
    });
    this.sendService.emitSend();

    await this.userFetch();
    this.userService.usersSubject.subscribe(value => {
      this.users = value;
    });
    this.userService.emitUsers();

    this.availableProducts = await this.productService.getAllAvailable();
    this.selectedProduct = await this.productService.getAllByOrder(this.order.id);

    this.initForm();
  }

  async initOrder(id: number) {
    this.order = await this.orderedService.getOne(id);
  }

  initForm() {
    this.orderForm = this.formBuilder.group({
      address: [this.order.billing_address, [Validators.required]],
      send: [this.order.send_id, [Validators.required]],
      user: [this.order.user_id, [Validators.required]],
      price: [this.order.price, [Validators.required]],
      reducedPrice: [this.order.price_after_reduce, [Validators.required]],
      coin: [this.order.coins_used],
      date: [dateToStringForms(this.order.date), [Validators.required]],
    });
  }

  selectProduct(product: string) {
    const id = Number(product);
    this.currentProduct = this.availableProducts.find(value => value.id === id);

    if (this.currentProduct === undefined)
      this.currentProduct = this.removedProduct.find(value => value.id === id);
  }

  addProduct() {
    if (!this.currentProduct) {
      return;
    }
    let index = this.availableProducts.indexOf(this.currentProduct, 0);
    if (index > -1) {
      this.availableProducts.splice(index, 1);
      this.addedProduct.push(this.currentProduct);
      return;
    }

    index = this.removedProduct.indexOf(this.currentProduct, 0);
    if (index > -1) {
      this.removedProduct.splice(index, 1);
      this.selectedProduct.push(this.currentProduct);
    }
  }

  removeProduct(product: Product) {
    console.log("removeProduct: " + product.name);
    let index = this.selectedProduct.indexOf(product, 0);
    if (index > -1) {
      this.selectedProduct.splice(index, 1);
      this.removedProduct.push(product);
      return;
    }

    index = this.addedProduct.indexOf(product, 0);
    if (index > -1) {
      this.addedProduct.splice(index, 1);
      this.availableProducts.push(product);
    }
  }

  async onSubmitForm() {
    let {address, date, send, user, price, reducedPrice, coin} = this.orderForm.value;
    console.log("date: " + date);

    const res = await this.orderedService.update({
      id: this.order.id,
      billing_address: address,
      date,
      coins_used: coin,
      price_after_reduce: reducedPrice,
      user_id: user,
      send_id: send,
      price
    });

    if (res !== null) {

      for (let prod of this.removedProduct) {
        await this.productService.update({
          id: prod.id,
          name: prod.name,
          description: prod.description,
          serial_number: prod.serial_number,
          price: prod.price,
          piece_of: prod.piece_of,
          entrepot_store_id: prod.entrepot_store_id,
          order_id: null
        });
      }

      for (let prod of this.addedProduct) {
        await this.productService.update({
          id: prod.id,
          name: prod.name,
          description: prod.description,
          serial_number: prod.serial_number,
          price: prod.price,
          piece_of: prod.piece_of,
          entrepot_store_id: prod.entrepot_store_id,
          order_id: this.order.id
        });
      }

      this.router.navigate(['/admin/ordered']);
    } else {
      alert("Error of update");
    }
  }
}
