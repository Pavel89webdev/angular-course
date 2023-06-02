import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from './auth.service'
import { map, take, tap } from 'rxjs/operators'
import { pipe } from 'rxjs'
import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { IAppState } from '../store/app.reducer'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService, 
    private router: Router,
    private store: Store<IAppState>
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.store.select('auth').pipe(
      take(1),
      map(({user}) => {
        const isAuth = Boolean(user)

        return isAuth || this.router.createUrlTree(['/auth'])
      })
    )
  }
}
