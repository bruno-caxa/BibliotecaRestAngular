import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../service/user.service';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {

  formUser = this.formBuilder.group({
    id: 0,
    username: [''],
    password: [''],
    email: [''],
    cpf: [''],
    telephone: [''],
    isAdmin: false,
    token: ['']
  });

  private unsubscribe = new Subject<void>;

  constructor(private formBuilder: NonNullableFormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserStorage()
                    .pipe(takeUntil(this.unsubscribe))
                    .subscribe(user => {
      this.formUser.setValue({
        id: user.id,
        username: user.username,
        password: '',
        email: user.email,
        cpf: user.cpf,
        telephone: user.telephone,
        isAdmin: user.isAdmin,
        token: user.token
      })
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  save() {
    this.userService.save(this.formUser.value)
                    .pipe(takeUntil(this.unsubscribe))
                    .subscribe(data => {
      this.router.navigate(['/books']);
      this.snackBar.open('User successfully saved!', 'close', {duration: 5000});
    });
  }

}
