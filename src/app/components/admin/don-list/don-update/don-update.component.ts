import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Don} from "../../../../models/don.model";
import {User} from "../../../../models/user.model";
import {DonService} from "../../../../services/don.service";
import {UserService} from "../../../../services/user.service";
import {dateToStringForms} from "../../../../utils/dateutils";

@Component({
  selector: 'app-don-update',
  templateUrl: './don-update.component.html',
  styleUrls: ['./don-update.component.scss']
})
export class DonUpdateComponent implements OnInit {

  donForm!: FormGroup;
  don!: Don;
  users: User[] = [];

  constructor(private formBuilder: FormBuilder,
              private donService: DonService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) { }


  async addressFetch() {
    await this.userService.getAll();
  }

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.params['id'];
    await this.initProduct(id);

    await this.addressFetch();
    this.userService.usersSubject.subscribe(value => {
      this.users = value;
    });
    this.userService.emitUsers();

    this.initForm();
  }

  async initProduct(id: number) {
    this.don = await this.donService.getOne(id);
  }

  initForm() {
    this.donForm = this.formBuilder.group({
      user: [this.don.user_id, [Validators.required]],
      date: [dateToStringForms(this.don.date), [Validators.required]],
      coin: [this.don.coins_win],
    });
  }

  async onSubmitForm() {
    let {user, date, coin} = this.donForm.value;
    console.log("date: "+date);
    const res = await this.donService.update( {
      id: this.don.id,
      coins_win: coin,
      user_id: user,
      date: date
    });

    if (res !== null){
      this.router.navigate(['/admin/don']);
    }else{
      alert("Error of update");
    }
  }

}
