import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthUserService} from "../../../../services/auth-user.service";
import {EntrepotService} from "../../../../services/entrepot.service";
import {Entrepot} from "../../../../models/entrepot.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  userForm!: FormGroup;
  entrepots: Entrepot[] = [];
  entrepotsSubscription!: Subscription;

  constructor(private formBuilder: FormBuilder,
              private authUser: AuthUserService,
              private router: Router,
              private entrepotService: EntrepotService) {
  }

  async ngOnInit(): Promise<void> {
    this.initForm();
    await this.entrepotsFetch()
    this.entrepotsSubscription = this.entrepotService.entrepotSubject.subscribe(
      (entrepots: Entrepot[]) => {
        this.entrepots = entrepots;
      }
    )
    this.entrepotService.emitEntrepot();
  }

  async entrepotsFetch() {
    await this.entrepotService.getAll();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      entrepots: ['']
    });
  }

  async onSubmitForm() {
    const value = this.userForm.value;
    // console.log(name);
    const res = await this.authUser.register({
      ...value
    });
    if (res !== null) {
      this.router.navigate(['/admin/user']);
    } else {
      alert("Error of creation");
    }
  }

//todo ça va pas passer du premier coup (onsubmit)
}
