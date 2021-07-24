import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Don} from "../../../../models/don.model";
import {DonService} from "../../../../services/don.service";
import {User} from "../../../../models/user.model";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-single-don',
  templateUrl: './single-don.component.html',
  styleUrls: ['./single-don.component.scss']
})
export class SingleDonComponent implements OnInit {

  user?: User;

  @Input() don!: Don;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private donService: DonService,
              private userService: UserService) {
  }

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];
    await this.initDon(id);

    if (this.don.user_id)
      this.user = await this.userService.getOne(this.don.user_id);
  }

  async initDon(id: number) {
    this.don = await this.donService.getOne(id);
  }

  onUpdate() {
    this.router.navigate([`admin/don-update/${this.don.id}`])
  }

  async onDelete() {
    const isDelete = await this.donService.delete(this.don.id);
    if (isDelete) {
      this.router.navigate(['/admin/don'])
    } else {
      alert("Is not delete !");
    }
  }


}
