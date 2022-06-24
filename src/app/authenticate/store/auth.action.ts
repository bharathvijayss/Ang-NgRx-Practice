import { createAction, props } from "@ngrx/store";
import { TokenInfo } from "../models/token-info.model";
import { user } from "../models/user.model";

export const LOGIN_START = '[Shared Auth Module] Login Started';
export const LOGIN_SUCCESS = '[Shared Auth Module] Login succeeded';
export const SIGNUP_START = '[Shared Auth Module] Signup Started';
export const SIGNUP_SUCCESS = '[Shared Auth Module] Signup succeeded';
export const LOGOUT_START = '[Shared Auth Module] Logout Started';
export const LOGOUT_SUCCESS = '[Shared Auth Module] Logout succeeded';
// export const AUTO_LOGOUT = '[Shared Auth Module] Auto Logout Activated';

export const loginStart = createAction(LOGIN_START, props<{ userData: user }>());
export const loginSuccess = createAction(LOGIN_SUCCESS, props<{ tokenData: TokenInfo, redirect: boolean }>());
export const signUpStart = createAction(SIGNUP_START, props<{ userData: user }>());
export const signUpSuccess = createAction(SIGNUP_SUCCESS, props<{ tokenData: TokenInfo, redirect: boolean }>());
export const logoutStart = createAction(LOGOUT_START);
export const logoutSuccess = createAction(LOGOUT_SUCCESS);
// export const autoLogout = createAction(AUTO_LOGOUT);