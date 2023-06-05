import { Actions, createEffect, ofType } from '@ngrx/effects'
import * as authActions from './auth.action'
import { of } from 'rxjs'
import { switchMap, map, catchError, tap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { User } from '../user.model'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { ERoutes } from 'src/app/app-router.module'
import { BrowserStorageService } from '../browesr-storage.service'
import { AuthService } from '../auth.service'

export interface IAuthResponseData {
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
}

export interface ISinginResponseData extends IAuthResponseData {
  displayName: string
  registered: boolean
}

export interface IErrorData {
  error?: {
    error?: {
      message: string
    }
  }
}

@Injectable()
export class AuthEffect {
  API_KEY = 'AIzaSyAVXC5PS4Tj57nUDEONR5Q6rxB-NOQczMM'

  private getUserFromResponse(
    responseData: IAuthResponseData | ISinginResponseData
  ) {
    const { email, expiresIn, idToken, localId } = responseData
    const expiresInDate = new Date(Date.now() + Number(expiresIn) * 1000)
    const newUser = new User(email, localId, idToken, expiresInDate)

    return newUser
  }

  private getErrorMessageFromResponse(errorResponseData?: IErrorData) {
    let errorMessage = 'An unknown error occured'

    switch (errorResponseData?.error?.error?.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'The email address is already in use by another account'
        break
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project'
        break
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
      case 'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.':
        errorMessage =
          'We have blocked all requests from this device due to unusual activity. Try again later'
        break
      case 'EMAIL_NOT_FOUND':
        errorMessage =
          'There is no user record corresponding to this identifier. The user may have been deleted'
        break
      case 'INVALID_PASSWORD':
        errorMessage =
          'The password is invalid or the user does not have a password'
        break
      case 'USER_DISABLED':
        errorMessage = 'The user account has been disabled by an administrator'
        break
    }

    return errorMessage
  }

  loginEffect = createEffect(() => {
    return this.action$.pipe(
      ofType<authActions.LoginStartAction>(authActions.LOGIN_START),
      switchMap((action) => {
        const { email, password } = action.payload

        const singInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`

        return this.http
          .post<ISinginResponseData>(singInUrl, {
            email,
            password,
            returnSecureToken: true,
          })
          .pipe(
            map((responseData) => {
              return new authActions.LoginSucsessAction({
                user: this.getUserFromResponse(responseData),
                redirect: true,
              })
            }),
            catchError((errorResponseData?: IErrorData) => {
              const errorMessage =
                this.getErrorMessageFromResponse(errorResponseData)
              return of(new authActions.LoginErrorAction(errorMessage))
            })
          )
      })
    )
  })

  signUpEffect = createEffect(() => {
    return this.action$.pipe(
      ofType(authActions.SINGUP_START),
      switchMap((action) => {
        const { email, password } = action.payload

        const singUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`

        return this.http
          .post<IAuthResponseData>(singUpUrl, {
            email,
            password,
            returnSecureToken: true,
          })
          .pipe(
            map(
              (user) =>
                new authActions.SingupSuccsessAction(
                  this.getUserFromResponse(user)
                )
            ),
            catchError((errorResponseData) => {
              const errorMessage =
                this.getErrorMessageFromResponse(errorResponseData)
              return of(new authActions.SingUpErrorAction(errorMessage))
            })
          )
      })
    )
  })

  succsessSingUpEffect = createEffect(
    () => {
      return this.action$.pipe(
        ofType(authActions.SINGUP_SUCCSESS),
        tap(({ payload }) => {
          this.browserStorageService.storeUser(payload)
          this.authService.setAutoLogout(payload.tokenExpirationDate)

          this.router.navigate([`/${ERoutes.recipies}`])
        })
      )
    },
    {
      dispatch: false,
    }
  )

  succsessLoginEffect = createEffect(
    () => {
      return this.action$.pipe(
        ofType(authActions.LOGIN_SUCCSSES),
        tap(({ payload }) => {
          const { redirect, user } = payload
          this.browserStorageService.storeUser(user)
          this.authService.setAutoLogout(user.tokenExpirationDate)

          if(redirect) {
            this.router.navigate([`/${ERoutes.recipies}`])
          }

        })
      )
    },
    {
      dispatch: false,
    }
  )

  autoLogginEffect = createEffect(() => {
    return this.action$.pipe(
      ofType<authActions.AutoLoginAction>(authActions.AUTO_LOGIN),
      switchMap(() => {
        const userData = this.browserStorageService.getUser()

        if (!userData) {
          return of()
        }

        const { email, id, token, tokenExpirationDate } = userData

        const user = new User(email, id, token, tokenExpirationDate)

        if (user.token) {
          return of(
            new authActions.LoginSucsessAction({ user, redirect: false })
          )
        }

        return of()
      })
    )
  })

  logoutEffect = createEffect(
    () => {
      return this.action$.pipe(
        ofType(authActions.LOGOUT),
        tap(() => {
          this.router.navigate(['/auth'])
          this.browserStorageService.clearUser()
          this.authService.clearAutoLogoutTimer()
        })
      )
    },
    {
      dispatch: false,
    }
  )

  constructor(
    private action$: Actions<authActions.ActionsTypes>,
    private http: HttpClient,
    private router: Router,
    private browserStorageService: BrowserStorageService,
    private authService: AuthService
  ) {}
}
