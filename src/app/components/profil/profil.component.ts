import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {Session} from "../../models/session.model";
import {AuthUserService} from "../../services/auth-user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  connectedUser!: User;
  activeSession!: Session;
  sessionSubscription!: Subscription;

  constructor(private userService : UserService,
              private authUser: AuthUserService
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
  }

}
