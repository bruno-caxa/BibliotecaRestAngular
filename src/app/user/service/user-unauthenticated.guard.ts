import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserUnauthenticatedGuard implements CanActivate {

  loggedIn = false;

  constructor(private userService: UserService,
              private router: Router) {
    this.userService.getUserStorage().subscribe(user => {
      this.loggedIn = false;
        if (user.token !== null && user.token.length > 0 ) {
          this.loggedIn = true;
        }
    });
  }

  canActivate() {
    if (this.loggedIn) {
      this.router.navigate(['/profile']);
      return false;
    }
    return true;
  }

}
