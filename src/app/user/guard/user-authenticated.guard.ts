import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs';

import { UserService } from '../service/user.service';

export const userAuthenticatedGuard = () => {
  const userService = inject(UserService);
  const router = inject(Router)
  const snackBar = inject(MatSnackBar)
  let loggedIn = false;

  userService.getUserStorage()
             .pipe(take(1))
             .subscribe(state => {
              loggedIn = state.loggedIn;
             });

  if (loggedIn) {
    return true;
  }
  router.navigate(['/login']);
  snackBar.open('To access this page please login!', 'close', {duration: 5000});
  return false;
}
