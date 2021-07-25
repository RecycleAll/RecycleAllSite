import { Component, OnInit } from '@angular/core';
import {Entrepot} from "../../../models/entrepot.model";
import {EntrepotService} from "../../../services/entrepot.service";

@Component({
  selector: 'app-entrepot-list',
  templateUrl: './entrepot-list.component.html',
  styleUrls: ['./entrepot-list.component.scss']
})
export class EntrepotListComponent implements OnInit {

  entrepots: Entrepot[] = []

  constructor(private entrepotService: EntrepotService) { }

  async ngOnInit(): Promise<void> {
    await this.entrepotFetch();
    this.entrepotService.entrepotSubject.subscribe(
      (entrepots: Entrepot[]) => {
        this.entrepots = entrepots;
      }
    )
    this.entrepotService.emitEntrepot();
  }

  async entrepotFetch() {
    await this.entrepotService.getAll();
  }
}
