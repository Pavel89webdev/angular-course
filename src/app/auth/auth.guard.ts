import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { map, take } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { IAppState } from '../store/app.reducer'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard  {
  constructor(
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
