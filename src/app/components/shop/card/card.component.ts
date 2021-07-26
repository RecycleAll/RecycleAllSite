import {Component, OnInit} from '@angular/core';
import {Product} from "../../../models/product.model";
import {ProductsService} from "../../../services/products.service";
import {AuthUserService} from "../../../services/auth-user.service";
import {OrderedService} from "../../../services/ordered.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserAddressService} from "../../../services/user-address.service";
import {Address} from "../../../models/address.model";
import {AddressService} from "../../../services/address.service";
import {CoinService} from "../../../services/coin.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  isAuth!: boolean;
  cardForm!: FormGroup;
  leftToPay!: number;
  validationForm!: FormGroup;
  coinUsedForOrder!: number;
  finalPriceOfOrderInEuro!: number;
  coinRatio!: number;

  displayConfirm: boolean = false;

  userAddress: Address[] = [];

  constructor(private formBuilder: FormBuilder,
              public authUserService: AuthUserService,
              private productsService: ProductsService,
              private orderedService: OrderedService,
              private addressService: AddressService,
              private userAddressService: UserAddressService,
              private coinService:CoinService) {
  }

  async ngOnInit(): Promise<void> {
    this.initValidationForm()
    this.initForm();
    await this.getCoinRatio();
    const userAddresses = await this.userAddressService.getAllByUser(this.authUserService.getSession()!.user_id);
    for (const x of userAddresses) {
      if (x.address_id) {
        const address = await this.addressService.getOne(x.address_id)
        this.userAddress.push(address)
      }
    }
    this.isAuth = this.authUserService.isAuth();
    this.leftToPay = this.getPrice();
  }

  initForm() {
    this.cardForm = this.formBuilder.group({
      coinUsed: ['0', Validators.required]
    });
  }

  initValidationForm() {
    this.validationForm = this.formBuilder.group({
      billing_address: ['', Validators.required],
      delivery_address: ['', Validators.required]
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

  getMaxCoinUsable(): number {
    return Math.min(this.authUserService.getSession()!.recycle_coin, this.getPrice() / this.coinRatio);
  }

  async onChangeCoinUsed(change: string) {
    let coinUsed = parseInt(change);
    this.leftToPay = this.getPrice() - (coinUsed * this.coinRatio);
  }

  async getCoinRatio(){
    let coin = await this.coinService.getRation();
    this.coinRatio = coin.ratio;
  }

  async onSubmitForm() {
    let {coinUsed} = this.cardForm.value;
    this.coinUsedForOrder = coinUsed;
    this.finalPriceOfOrderInEuro = this.leftToPay;
    this.displayConfirm = true;
  }

  async onSubmitValidationForm(){
    const {billing_address, delivery_address} = this.validationForm.value;
    const user_id = this.authUserService.getSession()!.user_id;
    const userCoin = this.authUserService.getSession()!.recycle_coin - this.coinUsedForOrder;
    await this.authUserService.update({
      id: user_id,
      recycle_coins: userCoin,
      firstname: undefined,
      lastname: undefined,
      email: undefined,
      password: undefined,
      work_in: undefined
    })

    const order = await this.orderedService.create({
      price: this.getPrice(),
      coins_used: this.cardForm.value.coinUsed,
      price_after_reduce: this.finalPriceOfOrderInEuro,
      date: new Date(),
      billing_address: billing_address,
      user_id: user_id,
      send_id: undefined
    })

    for (const x of this.authUserService.getSession()!.card) {
      await this.productsService.update({
        id: x.id,
        order_id: order?.id
      })
    }

    this.authUserService.getSession()!.card = []

    this.authUserService.getSession()!.recycle_coin = userCoin;

    this.displayConfirm = false;
    this.leftToPay = 0;
  }

}
