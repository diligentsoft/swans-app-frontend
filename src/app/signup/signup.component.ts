import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {User} from "../service/user.model";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {

  @Input() user: User;

  constructor(private router: Router, private userService: UserService) {
    this.user = {
      email: '',
      firstname: '',
      lastname: '',
      address: {
        buildingId: '',
        street: '',
        locality: '',
        city: '',
        postcode: ''
      },
      telephone: ''
    }
  }

  signup() {
    this.userService.register(this.user);
    this.router.navigate(['/login']);
  }
}
