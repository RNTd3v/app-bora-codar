import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.headers.get('no-token')) {
      return next.handle(this.generateRequestWithoutToken(request));
    }

    return next.handle(request);
  }

  private generateRequestWithToken(token: string, request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      headers: request.headers.set('x_access_token', token)
    })
  }

  private generateRequestWithoutToken(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      headers: request.headers.delete('no-token')
    })
  }
}
