import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { CompanyIDInterceptor } from './companyId.interceptor';
import { LoaderInterceptor } from './loader.interceptor';

export const interceptorProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: CompanyIDInterceptor, multi: true},
  { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true}
];
