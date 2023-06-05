import { User } from '../user.model'
import * as actions from './auth.action'

export interface IAuthState {
  user: User
  logginInProcess: boolean
  errorMessage: string
}

const initialState: IAuthState = {
  user: null,
  logginInProcess: false,
  errorMessage: null,
}

export const authReducer = (
  state: IAuthState = initialState,
  action: actions.ActionsTypes
): IAuthState => {
  switch (action.type) {
    case actions.SINGUP_START:
    case actions.LOGIN_START:
      return {
        ...state,
        logginInProcess: true,
        errorMessage: null,
      }
    case actions.SINGUP_SUCCSESS:
      return {
        ...state,
        user: action.payload,
        logginInProcess: false,
      }
    case actions.LOGIN_SUCCSSES:
      return {
        ...state,
        user: action.payload.user,
        logginInProcess: false,
      }
    case actions.SIGNUP_ERROR:
    case actions.LOGIN_ERROR:
      return {
        ...state,
        logginInProcess: false,
        errorMessage: action.payload,
      }
    case actions.LOGOUT:
      return {
        ...initialState,
      }
    default:
      return state
  }
}
