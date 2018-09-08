import {Component} from '@angular/core';
import {UserService} from "./service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router, private userService: UserService) {}

  userAuthenticated() {
    return this.userService.isUserAuthenticated()
  }

  user() {
    return this.userService.getAuthenticatedUser()
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/intro']);
  }
}
