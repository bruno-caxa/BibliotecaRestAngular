import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs';

import { User } from '../../model/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formLogin = this.formBuilder.group({
    username: ['admin'],
    password: ['123']
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  login() {
    this.userService.login(this.formLogin.value)
                    .pipe(take(1))
                    .subscribe({
                      next: (user) => {
                        this.onSuccess(user);
                      },
                      error: (err) =>  this.onError()
                     })
  }

  onSuccess(user: User) {
    this.userService.loadUserInStore(user);
    this.snackBar.open('Welcome ' + user.username + ' to the digital bookstore.', 'close', {duration: 5000});
    this.router.navigate(['/books']);
  }

  onError() {
    this.snackBar.open('Error when login. Check your credentials!', 'close', {duration: 5000});
  }

}
