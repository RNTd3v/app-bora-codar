import { OptionsApi } from '@cms/core';
import { Observable } from 'rxjs';

/**
 * Serviço responsável por gerenciar requisições HTTP.
 */
export abstract class IApiService {
  /**
     * Realiza uma requisição HTTP com o método `GET`.
     * @param url URL chamada.
     * @param options opções da requisição.
     */
    abstract get<T>(url: string, opt?: OptionsApi): Observable<T>;

    /**
     * Realiza uma requisição HTTP com o método `POST`.
     * @param url URL chamada.
     * @param body body da requisição.
     * @param options opções da requisição.
     */
    abstract post<T>(url: string, body: any, opt?: OptionsApi): Observable<T>;

    /**
     * Realiza uma requisição HTTP com o método `PUT`.
     * @param url URL chamada.
     * @param body body da requisição.
     * @param options opções da requisição
     */
    abstract put<T>(url: string, body: any, opt?: OptionsApi): Observable<T>;

    /**
     * Realiza uma requisição HTTP com o método `PATCH`.
     * @param url URL chamada.
     * @param body body da requisição.
     * @param options opções da requisição.
     */
    abstract patch<T>(url: string, body: any, opt?: OptionsApi): Observable<T>;

    /**
     * Realiza uma requisição HTTP com o método `DELETE`.
     * @param url URL chamada.
     * @param options opções da requisição.
     */
    abstract delete<T>(url: string, opt?: OptionsApi): Observable<T>;
}
