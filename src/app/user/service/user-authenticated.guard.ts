import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, Router } from '@angular/router';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticatedGuard implements CanActivate {

  loggedIn = false;

  constructor(private userService: UserService,
              private router: Router,
              private snackBar: MatSnackBar) {
    this.userService.getUserStorage().subscribe(user => {
      this.loggedIn = false;
      if (user.token !== null && user.token.length > 0 ) {
        this.loggedIn = true;
      }
    });
  }

  canActivate() {
    if (this.loggedIn) {
      return true;
    }
    this.snackBar.open('To access this page please login!', 'close', {duration: 5000});
    this.router.navigate(['/login']);
    return false;
  }

}
