import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthUserService} from "../../../services/auth-user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authUser: AuthUserService
  ) {
  }

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

    const isAuth = await this.authUser.logIn(email, password)
      .catch((error) => {
        console.log("Error")
      });
    if (isAuth) {
      this.authUser.emitSession();
      const session = this.authUser.getSession();
      if (session != undefined && session.isAdmin){
        await this.router.navigate(['/admin']);
      } else {
        await this.router.navigate(['/my-account']);
      }
    } else {
      alert("Erreur de connexion !\nEmail ou password invalid.f");
    }

  }

}
