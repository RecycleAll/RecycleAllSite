import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[] = []
  usersSubscription!: Subscription;

  constructor(private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    await this.usersFetch()
    this.usersSubscription = this.userService.usersSubject.subscribe(
      (users: User[]) => {
        this.users = users;
      }
    )
    this.userService.emitUsers();
  }

  async usersFetch() {
    await this.userService.getAll();
  }

}
