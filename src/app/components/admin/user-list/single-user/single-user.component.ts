import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../models/user.model";

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent implements OnInit {

  user !: User;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService
  ) { }

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.params['id'];
    await this.initUser(id);
  }

  async initUser(id: number){
    this.user = await this.userService.getOne(id);
  }

  async onDelete() {
    const isDelete = await this.userService.delete(this.user.id);
    if(isDelete){
      this.router.navigate(['/admin/user'])
    }else{
      alert("Is not delete !");
    }
  }

  onUpdate() {
    this.router.navigate([`admin/user-update/${this.user.id}`])
  }

}
