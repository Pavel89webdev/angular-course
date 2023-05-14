import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { User } from './user.model'

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

interface IErrorData {
  error?: {
    error?: {
      message: string
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_KEY = 'AIzaSyAVXC5PS4Tj57nUDEONR5Q6rxB-NOQczMM'

  user = new BehaviorSubject<User>(null)

  constructor(private http: HttpClient) {}

  singUp({ email, password }: { email: string; password: string }) {
    const singUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`

    return this.http
      .post<IAuthResponseData>(singUpUrl, {
        email,
        password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleError),
        tap(this.handleAuthentication.bind(this))
      )
  }

  login({ email, password }: { email: string; password: string }) {
    const singInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`

    return this.http
      .post<ISinginResponseData>(singInUrl, {
        email,
        password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleError),
        tap(this.handleAuthentication.bind(this))
        )
  }

  handleAuthentication(responseData: IAuthResponseData | ISinginResponseData) {
    const { email, expiresIn, idToken, localId } = responseData
    const expiresInDate = new Date(Date.now() + Number(expiresIn) * 1000)
    const newUser = new User(email, localId, idToken, expiresInDate)
    this.user.next(newUser)
  }

  handleError(errorResponseData?: IErrorData) {
    let errorMessage = 'An unknown error occured'

    switch (errorResponseData?.error?.error?.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'The email address is already in use by another account'
        break
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project'
        break
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage =
          'We have blocked all requests from this device due to unusual activity. Try again later'
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

    return throwError(() => new Error(errorMessage))
  }
}
