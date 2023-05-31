import { createAction, createReducer, on, props } from '@ngrx/store';

import { User } from '../model/user';

export interface IUserState {
  user: User;
  loggedIn: boolean;
}

export const userInitialState: IUserState = {
  user: new User(),
  loggedIn: false
}

export const login = createAction('[User] Login',
                           props<{user: User}>());

export const logout = createAction('[User] Logout');

export const userReducer = createReducer(
  userInitialState,
  on(login, (state, payload) => {
    state = {
      user: payload.user,
      loggedIn: true
    }
    return state;
  }),
  on(logout, (state) => {
    state = {
      user: new User(),
      loggedIn: false
    }
    return state;
  })
);
