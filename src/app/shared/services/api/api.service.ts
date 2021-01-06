import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { IApiService, IConfigService, OptionsApi, QueryResultsModel } from '@cms/core';
import { environment } from '@cms/environment';
import { tap } from 'rxjs/operators';

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

  /**
   * @inheritdoc
   */
  getAll<T>(api: string, opt?: OptionsApi): Observable<T> {

    const url = this.generateUrl(api);

    if (url == null) {
      return throwError('URL inválida');
    }

    opt.itsAList = true;

    const options = this.geraOptionsRequest(opt);

    return this.http.get<T>(url, options).pipe(
      tap((result: any) => {
        const queryResults = result as QueryResultsModel;
        this.configService.setTotalPage(queryResults.totalPage);
        this.configService.queryResults = queryResults;
        return of(queryResults.data)
      })
    );
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
      opt.params = new HttpParams({ fromObject: this.configService.queryParams as any })
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
