import { Component, OnInit } from '@angular/core';
import {Ordered} from "../../../models/ordered.model";
import {OrderedService} from "../../../services/ordered.service";
import {AuthUserService} from "../../../services/auth-user.service";

@Component({
  selector: 'app-my-order-view',
  templateUrl: './my-order-view.component.html',
  styleUrls: ['./my-order-view.component.scss']
})
export class MyOrderViewComponent implements OnInit {

  orders: Ordered[] = []

  constructor(private orderedService: OrderedService,
              private authUserService:AuthUserService) { }

  async ngOnInit() {
    this.orders = await this.orderedService.getByUser(this.authUserService.getSession()!.user_id);
  }

}
