import { Action } from '@ngrx/store';
import { User } from './../model/user';

export enum UserActionType {
  Login = '[User] Login',
  Logout = '[User] Logout'
}

export const Login = (user: User) => {
  return <Action>{ type: UserActionType.Login, payload: user};
}

export const Logout = () => {
  return <Action>{ type: UserActionType.Logout, payload: ''};
}
