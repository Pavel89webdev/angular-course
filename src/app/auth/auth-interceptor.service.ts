import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { take, exhaustMap } from 'rxjs/operators'
import { AuthService } from './auth.service'
import { Injectable } from '@angular/core'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
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
