import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthUserService} from "./auth-user.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate{

  constructor(private router: Router,
              private authUserService: AuthUserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const session = this.authUserService.getSession();
    if (session && session.isAdmin) {
      return true
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
