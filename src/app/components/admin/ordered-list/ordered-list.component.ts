import { Component, OnInit } from '@angular/core';
import {OrderedService} from "../../../services/ordered.service";
import {Ordered} from "../../../models/ordered.model";

@Component({
  selector: 'app-ordered-list',
  templateUrl: './ordered-list.component.html',
  styleUrls: ['./ordered-list.component.scss']
})
export class OrderedListComponent implements OnInit {

  ordereds: Ordered[] = []

  constructor(private orderedService: OrderedService) { }

  async ngOnInit() {
    await this.orderedFetch();
    this.orderedService.orderedSubject.subscribe(
      (sends: Ordered[]) => {
        this.ordereds = sends;
      }
    )
    this.orderedService.emitOrdered();
  }

  async orderedFetch() {
    await this.orderedService.getAll();
  }

}
