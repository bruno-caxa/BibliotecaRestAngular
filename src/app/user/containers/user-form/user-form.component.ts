import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs';

import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

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

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUserStorage()
                    .pipe(take(1))
                    .subscribe(state => {
                      const user = state.user;
                      this.formUser.setValue({
                        id: user.id,
                        username: user.username,
                        password: '',
                        email: user.email,
                        cpf: user.cpf,
                        telephone: user.telephone,
                        isAdmin: user.isAdmin,
                        token: user.token
                      });
                    });
  }

  save() {
    this.userService.save(this.formUser.value);
    this.router.navigate(['/books']);
    this.snackBar.open('User successfully saved!', 'close', {duration: 5000});
  }

}
