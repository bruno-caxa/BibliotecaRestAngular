import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take, tap } from 'rxjs';

import { User } from './../model/user';
import { Login, Logout } from './../store/user.actions';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API = 'api/user';

  constructor(private httpClient: HttpClient,
              private router: Router,
              private store: Store<any>) { }


  private findByToken(token: string): Observable<User> {
    return this.httpClient.get<User>(this.API + '/token/' + token);
  }

  getUserStorage(): Observable<User> {
    const token = localStorage.getItem('token');

    if (token) {
      this.findByToken(token)
          .pipe(take(1))
          .subscribe(user => {
        this.store.dispatch(Login(user));
      });
    }

    return this.store.select('user');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  login(user: Partial<User>): Observable<any> {
    return this.httpClient.post(this.API + '/authenticate', user, {responseType: 'text'}).pipe(
      tap((token) => {
        if (token == null) return;
        localStorage.setItem('token', token);
      })
    );
  }

  logout() {
    this.store.dispatch(Logout());
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  save(user: Partial<User>): Observable<User> {
    return this.httpClient.post<User>(this.API, user);
  }

}
