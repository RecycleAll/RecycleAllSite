import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Entrepot} from "../../../../models/entrepot.model";
import {Subscription} from "rxjs";
import {AuthUserService} from "../../../../services/auth-user.service";
import {EntrepotService} from "../../../../services/entrepot.service";
import {User} from "../../../../models/user.model";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  userForm!: FormGroup;
  entrepots: Entrepot[] = [];
  entrepotsSubscription!: Subscription;
  user!: User;

  constructor(private formBuilder: FormBuilder,
              private authUser: AuthUserService,
              private router: Router,
              private entrepotService: EntrepotService,
              private route: ActivatedRoute,
              private userService: UserService) {
  }

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.params['id'];
    await this.initUser(id);
    this.initForm();
    await this.entrepotsFetch()
    this.entrepotsSubscription = this.entrepotService.entrepotSubject.subscribe(
      (entrepots: Entrepot[]) => {
        this.entrepots = entrepots;
      }
    )
    this.entrepotService.emitEntrepot();
  }

  async initUser(id: number) {
    this.user = await this.userService.getOne(id);
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      firstname: [this.user.firstname, [Validators.required]],
      lastname: [this.user.lastname, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      newpassword: ['', [Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      entrepots: [this.user.work_in]
    });
  }

  async entrepotsFetch() {
    await this.entrepotService.getAll();
  }

  async onSubmitForm() {
    let {firstname, lastname, email, newpassword, entrepots} = this.userForm.value;
    if (newpassword !== '') {
      const res = await this.authUser.update({
        id: this.user.id,
        firstname,
        lastname,
        email,
        recycle_coins: this.user.recycle_coins,
        password: newpassword,
        work_in: entrepots
      });
      if (res !== null) {
        this.router.navigate(['/admin/user']);
      } else {
        alert("Error of update");
      }
    } else {
      newpassword = undefined;
      const res = await this.authUser.update({
        id: this.user.id,
        firstname,
        lastname,
        email,
        recycle_coins: this.user.recycle_coins,
        password: newpassword,
        work_in: entrepots
      });
      if (res !== null) {
        this.router.navigate(['/admin/user']);
      } else {
        alert("Error of update");
      }
    }
  }

}
