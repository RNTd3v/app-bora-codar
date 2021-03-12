import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../services';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.show();

    return this.httpHandlerRequest(next, request);
  }

  private httpHandlerRequest(next: HttpHandler, req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(finalize(() => this.loaderService.hide()));
  }
}
