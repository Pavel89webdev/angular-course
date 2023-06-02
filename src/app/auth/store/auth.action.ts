import { Action } from '@ngrx/store'
import { User } from '../user.model'

export const LOGIN_START = '[auth] login start'
export const LOGIN_SUCCSSES = '[auth] login succsess'
export const LOGIN_ERROR = '[auth] login error'

export const AUTO_LOGIN = '[auth] auto login'

export const SINGUP_START = '[auth] sing up start'
export const SINGUP_SUCCSESS = '[auth] sing up succsess'
export const SIGNUP_ERROR = '[auth] sign up error'

export const LOGOUT = '[auth] logout'

export class LoginStartAction implements Action {
  readonly type = LOGIN_START

  constructor(public payload: { email: string; password: string }) {}
}

export class LoginSucsessAction implements Action {
  readonly type = LOGIN_SUCCSSES

  constructor(public payload: User) {}
}

export class LoginErrorAction implements Action {
  readonly type = LOGIN_ERROR

  constructor(public payload: string) {}
}

export class LogoutAction implements Action {
  readonly type = LOGOUT
}

export class SingupStartAction implements Action {
  readonly type = SINGUP_START

  constructor(public payload: { email: string; password: string }) {}
}

export class SingupSuccsessAction implements Action {
  readonly type = SINGUP_SUCCSESS

  constructor(public payload: User) {}
}

export class SingUpErrorAction implements Action {
  readonly type = SIGNUP_ERROR

  constructor(public payload: string) {}
}

export class AutoLoginAction implements Action {
  readonly type = AUTO_LOGIN
}

export type ActionsTypes =
  | LogoutAction
  | LoginSucsessAction
  | LoginErrorAction
  | LoginStartAction
  | SingupStartAction
  | SingupSuccsessAction
  | SingUpErrorAction
  | AutoLoginAction
