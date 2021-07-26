import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/user.model";
import {Session} from "../../../models/session.model";
import {Subscription} from "rxjs";
import {UserService} from "../../../services/user.service";
import {AuthUserService} from "../../../services/auth-user.service";
import {Address} from "../../../models/address.model";
import {AddressService} from "../../../services/address.service";

@Component({
  selector: 'app-my-account-view',
  templateUrl: './my-account-view.component.html',
  styleUrls: ['./my-account-view.component.scss']
})
export class MyAccountViewComponent implements OnInit {

  connectedUser!: User;
  activeSession!: Session;
  sessionSubscription!: Subscription;

  address: Address[] = [];

  constructor(private userService : UserService,
              private authUser: AuthUserService,
              private addressService: AddressService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.initSession();

    await this.initUser(this.activeSession.user_id);



  }

  async initSession() {
    this.sessionSubscription = this.authUser.sessionSubject.subscribe(
      (session: Session) => {
        this.activeSession = session;
      }
    )
    this.authUser.emitSession();
  }

  async initUser(id: number) {
    this.connectedUser = await this.userService.getOne(id);

    //TODO load all address

  }

}
