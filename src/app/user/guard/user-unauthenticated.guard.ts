import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';

import { UserService } from '../service/user.service';

export const userUnauthenticatedGuard = () => {
  const userService = inject(UserService);
  const router = inject(Router)
  let loggedIn = false;

  userService.getUserStorage()
            .pipe(take(1))
            .subscribe(state => {
              loggedIn = state.loggedIn;
            });

  if (loggedIn) {
    router.navigate(['/profile']);
    return false;
  }
  return true;;
}

