import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';

import { IUserState, login, logout } from '../store/user.reducer';
import { User } from './../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API = 'api/user';

  constructor(
    private httpClient: HttpClient,
    private store: Store<{user: IUserState}>
  ) { }


  findByToken(token: string): Observable<User> {
    return this.httpClient.get<User>(environment.API + this.API + '/token/' + token);
  }

  loadUserInStore(user: User): void {
    localStorage.setItem('token', user.token);
    this.store.dispatch(login({user: user}));
  }

  getUserStorage(): Observable<IUserState> {
    return this.store.select('user');
  }

  login(user: Partial<User>): Observable<User> {
    return this.httpClient.post<User>(environment.API + this.API + '/authenticate', user);
  }

  logout(): void {
    this.store.dispatch(logout());
    localStorage.removeItem('token');
  }

  save(user: Partial<User>): void {
    this.httpClient.post<User>(environment.API + this.API, user)
                   .pipe(take(1))
                   .subscribe();
  }

}
