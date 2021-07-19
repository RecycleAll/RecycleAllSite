import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthUserService} from "../../services/auth-user.service";
import {Subscription} from "rxjs";
import {Session} from "../../models/session.model";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isAuth : boolean = false;
  isAdmin : boolean = false;
  authSubscription!: Subscription;
  activeSession!: Session;
  connectedUser!: User;

  constructor(private authUserService: AuthUserService,
              private router: Router,
              private userService: UserService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.initSession();
    if (this.isAuth){
      await this.initUser(this.activeSession.user_id);
    }
  }

  onSignOut() {
    this.authUserService.logOut()
    this.router.navigate(['/home'])
  }

  async initSession() {
    this.authSubscription = this.authUserService.sessionSubject.subscribe(
      (session: Session) => {
        this.isAuth = session !== undefined;
        this.activeSession = session;
      }
    );
    this.authUserService.emitSession();
  }

  async initUser(id: number) {
    this.connectedUser = await this.userService.getOne(id);
    this.isAdmin = this.connectedUser.work_in != undefined;
  }



}
