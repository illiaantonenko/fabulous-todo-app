import { Action } from 'redux';

import * as TYPES from './types';

// Auth user
export const authUserRequest = (payload: TYPES.IAuthUser) : TYPES.UserActionTypes => ({
  payload,
  type: TYPES.USER_AUTH_REQUEST,
});

export const regUserRequest = (payload: TYPES.IRegUser) : TYPES.UserActionTypes => ({
  payload,
  type: TYPES.USER_REG_REQUEST,
});

export const setUser = (payload: TYPES.IUser) : TYPES.UserActionTypes => ({
  payload,
  type: TYPES.USER_SET,
});

export const logOut = () : Action => ({
  type: TYPES.LOGOUT,
});
