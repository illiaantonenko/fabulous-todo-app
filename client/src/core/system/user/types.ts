import { Action } from 'redux';

export interface IUser {
  token: string;
  id: string;
  created_at: Date | null;
  username: string;
  email: string;
  isFetching?: boolean;
}

export interface IAuthUser {
  email: string;
  password: string;
}

export interface IRegUser {
  username: string;
  email: string;
  password: string;
}

export const USER_AUTH_REQUEST = 'USER_AUTH_REQUEST';
export const USER_REG_REQUEST = 'USER_REG_REQUEST';

export const USER_SET = 'USER_SET';
export const LOGOUT = 'LOGOUT';

export interface IAuthUserAction extends Action<string> {
  payload: IAuthUser;
}

export interface IRegUserAction extends Action<string> {
  payload: IRegUser;
}

export interface ISetUserAction extends Action<string> {
  payload: IUser;
}

export type UserActionTypes = IAuthUserAction | IRegUserAction | ISetUserAction;
