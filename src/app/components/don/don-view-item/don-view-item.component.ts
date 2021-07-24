import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../models/user.model";
import {Don} from "../../../models/don.model";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-don-view-item',
  templateUrl: './don-view-item.component.html',
  styleUrls: ['./don-view-item.component.scss']
})
export class DonViewItemComponent implements OnInit {

  user?: User;

  @Input() don!: Don;
  constructor(private userService: UserService) {
  }

  async ngOnInit() {
    if( this.don.user_id)
      this.user = await this.userService.getOne(this.don.user_id);
  }


}
