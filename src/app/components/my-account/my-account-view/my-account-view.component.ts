import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/user.model";
import {Session} from "../../../models/session.model";
import {Subscription} from "rxjs";
import {UserService} from "../../../services/user.service";
import {AuthUserService} from "../../../services/auth-user.service";
import {Address} from "../../../models/address.model";
import {AddressService} from "../../../services/address.service";
import {UserAddressService} from "../../../services/user-address.service";
import {Router} from "@angular/router";
import {Entrepot} from "../../../models/entrepot.model";
import {EntrepotService} from "../../../services/entrepot.service";

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
  entrepo?: Entrepot;

  constructor(private router: Router,
              private userService : UserService,
              private authUser: AuthUserService,
              private addressService: AddressService,
              private userAddressService: UserAddressService,
              private entrepotService: EntrepotService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.initSession();

    await this.initUser(this.activeSession.user_id);

  }

  onUpdate() {
    this.router.navigate([`my-account/edit`])
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

    if(this.connectedUser.work_in)
      this.entrepo = await this.entrepotService.getOne( this.connectedUser.work_in);

    let userAddresses = await this.userAddressService.getAllByUser(this.connectedUser.id);

    for(let ua of userAddresses){
      let address;
      if(ua.address_id)
         address = await this.addressService.getOne(ua.address_id);

      if(address)
        this.address.push(address);
    }

  }

}
