import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {UserService} from "../service/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router : Router, private userService: UserService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
    if (this.userService.isUserAuthenticated())
      return true;
    this.router.navigate(['/intro']);
    return false;
  }
}
