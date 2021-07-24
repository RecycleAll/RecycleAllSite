import {Component, OnInit} from '@angular/core';
import {Don} from "../../../models/don.model";
import {DonService} from "../../../services/don.service";

@Component({
  selector: 'app-don-list',
  templateUrl: './don-list.component.html',
  styleUrls: ['./don-list.component.scss']
})
export class DonListComponent implements OnInit {

  dons: Don[] = []

  constructor(private donService: DonService) { }

  async ngOnInit(): Promise<void> {
    await this.productFetch();
    this.donService.donSubject.subscribe(
      (dons: Don[]) => {
        this.dons = dons;
      }
    )
    this.donService.emitDon();
  }

  async productFetch() {
    await this.donService.getAll();
  }


}
