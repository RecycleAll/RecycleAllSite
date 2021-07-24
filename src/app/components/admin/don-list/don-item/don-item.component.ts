import {Component, Input, OnInit} from '@angular/core';
import {Don} from "../../../../models/don.model";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../models/user.model";

@Component({
  selector: 'app-don-item',
  templateUrl: './don-item.component.html',
  styleUrls: ['./don-item.component.scss']
})
export class DonItemComponent implements OnInit {

  user?: User;

  @Input() don!: Don;
  constructor(private userService: UserService) {
  }

  async ngOnInit() {
    if( this.don.user_id)
      this.user = await this.userService.getOne(this.don.user_id);
  }

}
