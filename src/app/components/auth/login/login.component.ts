import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserLogInProps} from "../../../models/user.model";
import {SessionService} from "../../../services/session.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  async onSubmitForm() {
    const {email, password} = this.userForm.value;
    const userLogIn = new UserLogInProps(email, password);

    console.log("data : ", userLogIn)
  //  #TODO : ajouter la liaison avec le service

    await this.sessionService.logIn(email, password);
    // await this.sessionService.getUser();
    console.log("End log in function !")
  }

}
