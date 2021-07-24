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

  constructor(private formBuilder: FormBuilder,
              private orderedService: OrderedService,
              private sendService: SendService,
              private addressService: AddressService,
              private userService: UserService,
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
      coin: [this.order.coins_used, [Validators.required]],
      date: [this.order.date, [Validators.required]],
    });
  }

  async onSubmitForm() {
    let {address, date, send, user, price, reducedPrice, coin} = this.orderForm.value;
    console.log("date: "+date);

    const res = await this.orderedService.update( {
      id: this.order.id,
      billing_address:address,
      date,
      coins_used:coin,
      price_after_reduce:reducedPrice,
      user_id:user,
      send_id:send,
      price
    });

    if (res !== null){
      this.router.navigate(['/admin/ordered']);
    }else{
      alert("Error of update");
    }
  }
}
