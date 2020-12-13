import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IApiService, IConfigService, OptionsApi } from '@cms/core';
import { environment } from '@cms/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements IApiService {

  constructor(
    private configService: IConfigService,
    private http: HttpClient
  ) { }

  /**
   * @inheritdoc
   */
  get<T>(api: string, opt?: OptionsApi): Observable<T> {
    const url = this.generateUrl(api);
    if (url == null) {
      return throwError('URL inválida');
    }

    const options = this.geraOptionsRequest(opt);

    return this.http.get<T>(url, options);
  }

  private geraOptionsRequest(opt: OptionsApi): {
    headers?: HttpHeaders,
    params?: HttpParams | { [param: string]: string | string[]}
  } {

    if (!opt) {
      return {
        headers: {}
      } as any;
    }

    if (opt.itsAList) {
      opt.params = new HttpParams({ fromObject: this.configService.pagination as any })
    }

    const options: any = {
      headers: opt.headers || new HttpHeaders(),
      params: opt.params,
    };

    return options;
  }

  /**
   * @inheritdoc
   */
  post<T>(api: string, body: any, opt?: OptionsApi): Observable<T> {
    const url = this.generateUrl(api);
    if (url == null) {
      return throwError('URL inválida');
    }

    const options = this.geraOptionsRequest(opt);
    return this.http.post<T>(url, body, options);
  }

  /**
   * @inheritdoc
   */
  put<T>(api: string, body: any, opt?: OptionsApi): Observable<T> {
    const url = this.generateUrl(api);
    if (url == null) {
      return throwError('URL inválida');
    }

    const options = this.geraOptionsRequest(opt);
    return this.http.put<T>(url, body, options);
  }

  /**
   * @inheritdoc
   */
  patch<T>(api: string, body: any, opt?: OptionsApi): Observable<T> {
    const url = this.generateUrl(api);
    if (url == null) {
      return throwError('URL inválida');
    }

    const options = this.geraOptionsRequest(opt);
    return this.http.patch<T>(url, body, options);
  }

  /**
   * @inheritdoc
   */
  delete<T>(api: string, opt?: OptionsApi): Observable<T> {
    const url = this.generateUrl(api);
    if (url == null) {
      return throwError('URL inválida');
    }

    const options = this.geraOptionsRequest(opt);
    return this.http.delete<T>(url, options);
  }

  public generateUrl(api: string): string {
    if (!api) {
      return null;
    }

    const url = environment.API_URL;
    return url + api;
  }
}