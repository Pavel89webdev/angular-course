import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { take, exhaustMap, map } from 'rxjs/operators'
import { AuthService } from './auth.service'
import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { IAppState } from '../store/app.reducer'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store<IAppState>,
    ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      map(auth => auth.user),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req)
        }

        const newReq = req.clone({
          params: new HttpParams().set('auth', user.token),
        })
        return next.handle(newReq)
      })
    )
  }
}
