import {Component, OnInit} from '@angular/core';
import {Don} from "../../../models/don.model";
import {DonService} from "../../../services/don.service";
import {AuthUserService} from "../../../services/auth-user.service";
import {Session} from "../../../models/session.model";

@Component({
  selector: 'app-don-view',
  templateUrl: './don-view.component.html',
  styleUrls: ['./don-view.component.scss']
})
export class DonViewComponent implements OnInit {


  dons: Don[] = []
  session?: Session;

  constructor(private donService: DonService,
              private authUserService: AuthUserService) {
  }

  async ngOnInit(): Promise<void> {

    if (this.authUserService.isAuth()) {
      this.session = this.authUserService.getSession();
    }

    if (this.session)
      this.dons = await this.donService.getAllByUser(this.session.user_id);

    console.log("dons: " + this.dons.length);
  }

}
