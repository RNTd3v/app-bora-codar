import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { IAuthService } from '../services';
import { catchError, flatMap, mergeMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: IAuthService, private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.headers.get('no-token')) {
      return next.handle(this.generateRequestWithoutToken(request));
    }

    return this.validateToken().pipe(mergeMap((result: boolean) => {
      if (result) {
        return this.handleHttpRequest(next, this.generateRequestWithToken(this.authService.token, request));
      }
      return this.handleHttpRequest(next, request);
    }));

  }

  private generateRequestWithToken(token: string, request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      headers: request.headers
        .set('x-access-token', token)
    });
  }

  private generateRequestWithoutToken(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      headers: request.headers.delete('no-token')
    });
  }

  private validateToken(): Observable<boolean> {
    return from(this.authService.sessionIsValid());
  }

  private handleHttpRequest(next: HttpHandler, req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            return this.authService.requestNewToken().pipe(
              flatMap(({ token }) => {
                if (!!token) {
                  this.authService.updateToken(token)
                  req = req.clone({
                    headers: req.headers.set('x-access-token', token)
                  })
                  return next.handle(req);
                }
                this.authService.logout();
              }),
              catchError((_) => {
                this.authService.logout();
                return throwError(error);
              })
            )
          }
          // const message = !!error.error.message ? error.error.message : 'Houve um erro!';
          // this.snackBar.open(message, null, { duration: 2000});
          return throwError(error);
      })
    );
  }


}
