import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  email: string;
  loginFailed: boolean

  constructor(private router: Router, private userService: UserService) { }

  login() {
    if (this.userService.authenticate(this.email)) {
      this.router.navigate(['/home']);
    } else {
      this.loginFailed = true;
    }

  }
}
