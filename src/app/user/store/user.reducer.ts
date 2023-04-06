import { ActionModel } from './../../model/action.model';
import { User } from './../model/user';
import { UserActionType } from './user.actions';

export const user = new User();

export function userReducer(state: any, action: ActionModel) {
  if (!state) {
    state = user;
  }

  let stateRef = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case UserActionType.Login:
      stateRef = action.payload;
      return stateRef;

    case UserActionType.Logout:
      stateRef = new User();
      return stateRef;

    default:
      return stateRef;
  }
}
