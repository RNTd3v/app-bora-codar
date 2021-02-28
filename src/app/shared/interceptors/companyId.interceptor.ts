import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuthService } from '../services';

@Injectable()
export class CompanyIDInterceptor implements HttpInterceptor {

  constructor(private authService: IAuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.headers.get('no-company-id')) {
      return next.handle(this.generateRequestWithoutCompanyID(request));
    }

    return next.handle(
      this.generateRequestWithCompanyID(request)
    );

  }

  private generateRequestWithCompanyID(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      headers: request.headers
        .set('x-company-id', this.authService.companyID)
    });
  }

  private generateRequestWithoutCompanyID(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      headers: request.headers.delete('no-company-id')
    });
  }

}
