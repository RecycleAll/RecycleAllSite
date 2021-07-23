import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Entrepot} from "../../../../models/entrepot.model";
import {EntrepotService} from "../../../../services/entrepot.service";

@Component({
  selector: 'app-single-entrepot',
  templateUrl: './single-entrepot.component.html',
  styleUrls: ['./single-entrepot.component.scss']
})
export class SingleEntrepotComponent implements OnInit {

  entrepot !: Entrepot;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private entrepotService: EntrepotService
  ) {
  }

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.params['id'];
    await this.initUser(id);
  }

  async initUser(id: number) {
    this.entrepot = await this.entrepotService.getOne(id);
  }

  async onDelete() {
    const isDelete = await this.entrepotService.delete(this.entrepot.id);
    if (isDelete) {
      this.router.navigate(['/admin/entrepot'])
    } else {
      alert("Is not delete !");
    }
  }

}
