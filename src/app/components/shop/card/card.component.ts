import {Component, OnInit} from '@angular/core';
import {Product} from "../../../models/product.model";
import {ProductsService} from "../../../services/products.service";
import {AuthUserService} from "../../../services/auth-user.service";
import {OrderedService} from "../../../services/ordered.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  isAuth!: boolean;
  cardForm!: FormGroup;
  leftToPay!: number;

  constructor(private formBuilder: FormBuilder,
              public authUserService: AuthUserService,
              private productsService: ProductsService,
              private orderedService: OrderedService) {
  }

  async ngOnInit(): Promise<void> {
    this.isAuth = this.authUserService.isAuth();
    this.initForm();
    this.leftToPay = this.getPrice();
  }

  initForm() {
    this.cardForm = this.formBuilder.group({
      coinUsed: [0, Validators.required]
    });
  }

  async removeFromCard(product: Product) {
    this.authUserService.getSession()!.supprFromCard(product);
  }

  isInCard(product: Product) {
    const index = this.authUserService.getSession()!.card.findIndex(x => x.id === product.id)
    if (index != -1) {
      return true
    }
    return false
  }

  getPrice(): number {
    let price = 0;
    this.authUserService.getSession()!.card.forEach((x) => {
      if (x.price) {
        price += x.price;
      }
    })
    return price;
  }

  getMaxCoinUsable(): number{
      return Math.min(this.authUserService.getSession()!.recycle_coin, this.getPrice()*10);
  }

  onChangeCoinUsed(change :string){
    let coinUsed = parseInt(change);
    this.leftToPay = this.getPrice() - coinUsed/10;
  }

  async onSubmitForm() {
    const user_id = this.authUserService.getSession()!.user_id;
    const userCoin = this.authUserService.getSession()!.recycle_coin - this.getPrice();
    await this.authUserService.update({
      id: user_id,
      recycle_coins: userCoin,
      firstname: undefined,
      lastname: undefined,
      email: undefined,
      password: undefined,
      work_in: undefined
    })

    /*this.orderedService.create({
      price: this.getPrice(),
      coins_used: this.cardForm.value.coinUsed,
      price_after_reduce: this.leftToPay,
      date: new Date(),
      billing_address?: number,
      user_id: number,
      send_id: undefined
    })*/
  }

}
