import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AuthUserService} from "./auth-user.service";

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(private router: Router,
              private authUserService: AuthUserService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
    if (this.authUserService.isAuth()) {
      return true
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
