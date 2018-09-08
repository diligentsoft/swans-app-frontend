import {Injectable} from "@angular/core";
import {User} from "./user.model";

const userTokenKey: string = 'userToken'

@Injectable()
export class UserService {

  register(user: User) {
    localStorage.setItem(user.email, JSON.stringify(user))
  }

  authenticate(email) {
    if (localStorage.getItem(email) != null) {
      localStorage.setItem(userTokenKey, email);
      return true;
    } else {
      return false;
    }
  }

  isUserAuthenticated() {
    return localStorage.getItem(userTokenKey) != null
  }

  getAuthenticatedUser() {
    return localStorage.getItem(userTokenKey)
  }

  logout() {
    return localStorage.removeItem(userTokenKey)
  }

}
