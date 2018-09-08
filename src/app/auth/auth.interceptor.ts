import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {UserService} from "../service/user.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private userService: UserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get('No-Auth') == "True")
      return next.handle(req.clone());

    if (this.userService.isUserAuthenticated()) {
      const clonedreq = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + this.userService.getAuthenticatedUser())
      });
      return next.handle(clonedreq)
        .do(
          succ => { },
          err => {
            if (err.status === 401)
              this.router.navigateByUrl('/intro');
          }
        );
    }
    else {
      this.router.navigateByUrl('/login');
    }
  }
}
