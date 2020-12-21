import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AccessToken, Auth, IApiService, IAuthService } from '@cms/core';
import { Subject } from 'rxjs';
import { AuthResponse, TokenResponse } from '../../models';
import { IStorageService } from '../storage/storage.service.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {

  private readonly keyAccessToken = 'token';
  private readonly keyRefreshToken = 'refreshToken';

  private tokenInValidation = false;
  private tokenSubject: Subject<boolean>;

  constructor(
    private api: IApiService,
    private router: Router,
    private storage: IStorageService
    ) { }

  async login(email: string, password: string): Promise<boolean> {

    const body = { email, password } as Auth;

    return await this.requestAccessToken(body);

  }

  logout(): void {
    this.invalidateSection();
    this.router.navigate(['login']);
  }

  async sessionIsValid(): Promise<boolean> {
    /*const token = this.token;
    const refreshToken = this.refreshToken;
    if (!this.tokenIsValid(token)) {
      if (!this.tokenIsValid(refreshToken)) {
        return Promise.resolve(false);
      }

      return await this.updateToken(refreshToken);
    }*/
    return Promise.resolve(true);
  }

  private invalidateSection(): void {
    this.storage.clear();
  }

  // register(user: User): Observable<User> {}

  // requestPassword(email: string): Observable<any> {}

  private tokenIsValid(token: AccessToken): boolean {
    return token
      && token.token
      && token.timestampExp
      && new Date() <= new Date(token.timestampExp);
  }

  private async updateToken(refreshToken: AccessToken): Promise<boolean> {

    if (this.tokenInValidation) {
      if (!this.tokenSubject) {
        this.tokenSubject = new Subject<boolean>();
      }

      const tokenObservable = this.tokenSubject.asObservable();

      return tokenObservable.toPromise()
        .then((result: boolean) => {
          return result;
        });
    }

    const body = new HttpParams()
      .set('refresh_token', refreshToken.token)

    return await this.requestAccessToken(body);
  }

  private async requestAccessToken(body: any): Promise<boolean> {

    const options = {
      headers: new HttpHeaders()
        .set('no-token', 'true')
    };

    this.tokenInValidation = true;

    const tokenResponse: AuthResponse = await this.api.post<TokenResponse>('v1/auth', body, options)
      .toPromise().catch(() => null);

    return this.createAccessToken(tokenResponse);

  }

  private createAccessToken(tokenResponse: AuthResponse): boolean {
    let authResult = false;

    /*if (!tokenResponse
      || !tokenResponse.access_token
      || !tokenResponse.expires_in
      || !tokenResponse.refresh_expires_in) {
      this.notifyAuthResult(authResult);
      return authResult;
    }

    const tokenExpirationDate = new Date();
    const refreshTokenExpirationDate = new Date();
    tokenExpirationDate.setSeconds(tokenExpirationDate.getSeconds() + tokenResponse.expires_in);
    refreshTokenExpirationDate.setSeconds(refreshTokenExpirationDate.getSeconds() + tokenResponse.refresh_expires_in);

    this.storeAccessToken(this.keyAccessToken, {
      token: tokenResponse.access_token,
      timestampExp: tokenExpirationDate.getTime()
    } as AccessToken);

    this.storeAccessToken(this.keyRefreshToken, {
      token: tokenResponse.refresh_token,
      timestampExp: refreshTokenExpirationDate.getTime()
    } as AccessToken); */

    const tokenExpirationDate = new Date();
    tokenExpirationDate.setSeconds(tokenExpirationDate.getSeconds() + 3600);

    this.storeAccessToken(this.keyAccessToken, {
      token: tokenResponse.token,
      timestampExp: tokenExpirationDate.getTime()
    } as AccessToken);

    authResult = true;
    this.notifyAuthResult(authResult);
    return authResult;

  }

  private notifyAuthResult(authenticatedUser: boolean): void {
    this.tokenInValidation = false;
    if (this.tokenSubject) {
      this.tokenSubject.next(authenticatedUser);
      this.tokenSubject = null;
    }
  }

  private storeAccessToken(key: string, token: AccessToken) {
    this.storage.set(key, token);
  }

  get token(): string {
    return this.storage.get(this.keyAccessToken);
  }

  private get refreshToken(): AccessToken {
    return this.storage.get(this.keyRefreshToken);
  }
}
