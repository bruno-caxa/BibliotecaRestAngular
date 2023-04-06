import { Component, OnDestroy, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';

import { User } from '../../model/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  formLogin = this.formBuilder.group({
    username: [''],
    password: ['']
  });
  user = new User();

  private unsubscribe = new Subject<void>;

  constructor(private formBuilder: NonNullableFormBuilder,
              private userService: UserService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  login() {
    this.userService.login(this.formLogin.value)
                    .pipe(takeUntil(this.unsubscribe))
                    .subscribe(token => {
      if (token == null) {
        this.onError();
        return;
      }

      this.userService.getUserStorage()
                      .pipe(takeUntil(this.unsubscribe))
                      .subscribe(user => {
        this.user = user;
        this.onSuccess();
      });
    });
  }

  onSuccess() {
    this.snackBar.open('Welcome ' + this.user.username + ' to the digital bookstore.', 'close', {duration: 5000});
    this.router.navigate(['/books']);
  }

  onError() {
    this.snackBar.open('Error when login. Check your credentials!', 'close', {duration: 5000});
  }

}
