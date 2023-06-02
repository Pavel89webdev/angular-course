import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { IAppState } from '../store/app.reducer'
import * as authActions from './store/auth.action'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  autoLogoutTimer: number

  constructor(private store: Store<IAppState>) {}

  setAutoLogout(tokenExpirationDate: Date) {
    const expirationDration = tokenExpirationDate.getTime() - Date.now()

    this.clearAutoLogoutTimer()

    this.autoLogoutTimer = setTimeout(() => {
      this.clearAutoLogoutTimer()
      this.store.dispatch(new authActions.LogoutAction())
    }, expirationDration) as unknown as number
  }

  clearAutoLogoutTimer() {
    if (this.autoLogoutTimer) {
      clearTimeout(this.autoLogoutTimer)

      this.autoLogoutTimer = null
    }
  }
}
