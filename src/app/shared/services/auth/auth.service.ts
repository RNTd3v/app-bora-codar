import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccessToken, Auth, AuthResponse, IApiService, IAuthService, Menu, TokenResponse, User } from '@cms/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IStorageService } from '../storage/storage.service.interface';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {

  private readonly keyAccessToken = 'token';
  private readonly keyRefreshToken = 'refreshToken';
  private readonly keyCompanyId = 'companyId';
  private readonly keyUserId = 'userId';
  private readonly keyUserData = 'userData';
  private readonly keyUserMenu = 'userMenu';

  private tokenInValidation = false;
  private tokenSubject: Subject<boolean>;

  constructor(
    private api: IApiService,
    private router: Router,
    private snackBar: MatSnackBar,
    private storage: IStorageService
    ) { }

  async login(email: string, password: string): Promise<boolean> {

    const body = { email, password } as Auth;

    let loginStatus = false;

    loginStatus = await this.requestAccessToken(body);

    if (loginStatus) {
      loginStatus = await this.saveAuthenticatedUserData();
    }

    return loginStatus;

  }

  logout(): void {
    this.invalidateSection();
    this.router.navigate(['auth/login']);
  }

  registerUser(user: User): Observable<User> {
    return this.api.post<User>(`v1/users`, user);
  }

  async sessionIsValid(): Promise<boolean> {
    const token = this.storage.get(this.keyAccessToken);
    return Promise.resolve(this.tokenIsValid(token));
  }

  showUserMenu(): Menu[] {
    return this.storage.get(this.keyUserMenu);
  }

  requestNewToken(): Observable<{ token: string }> {

    const options = {
      headers: new HttpHeaders()
        .set('no-token', 'true')
        .set('x-refresh-token', this.refreshToken)
    };

    return this.api.post<{ token: string}>('v1/auth/refresh-token', {}, options).pipe(tap((_) => console.log(_)));

  }

  private async saveAuthenticatedUserData(): Promise<boolean> {

    let userDataStatus = false;

    const userData = await this.api.get<User>(`v1/users/${this.userID}`).toPromise();

    if (!!userData) {
      this.storeUserData(userData);
      userDataStatus = await this.saveAuthenticatedUserMenu();
    }

    return userDataStatus;

  }

  private async saveAuthenticatedUserMenu(): Promise<boolean> {

    let userMenuStatus = false;

    const userMenu = await this.api.get<Menu>(`v1/menus/showUserMenu`).toPromise();

    if (!!userMenu) {
      userMenuStatus = true;
      this.storeUserMenu(userMenu);
    }

    return userMenuStatus;

  }

  private invalidateSection(): void {
    this.storage.clear();
  }

  private tokenIsValid(token: AccessToken): boolean {
    return !!token && !!token.token;
  }

  async updateToken(token: string): Promise<boolean> {

      const newToken = {
        userId: this.userID,
        companyId: this.companyID,
        token,
        refreshToken: this.refreshToken
      } as unknown as AuthResponse;

    return this.createAccessToken(newToken);

  }

  private async requestAccessToken(body: any): Promise<boolean> {

    const options = {
      headers: new HttpHeaders()
        .set('no-token', 'true')
        .set('no-company-id', 'true')
    };

    this.tokenInValidation = true;

    const tokenResponse: AuthResponse = await this.api.post<TokenResponse>('v1/auth', body, options)
      .toPromise().catch((error) => {
        const message = !!error.error.message ? error.error.message : 'Houve um erro!';
        this.snackBar.open(message, null, { duration: 2000});
        return null
      });

    return this.createAccessToken(tokenResponse);

  }

  private createAccessToken(tokenResponse: AuthResponse): boolean {
    let authResult = false;

    if (!tokenResponse) {
      this.notifyAuthResult(authResult);
      return authResult;
    }

    this.storeAccessToken(this.keyAccessToken, {
      token: tokenResponse.token,
      refreshToken: tokenResponse.refreshToken
    } as AccessToken);

    this.storeId(this.keyCompanyId, tokenResponse.companyId);
    this.storeId(this.keyUserId, tokenResponse.userId);

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

  private storeAccessToken(key: string, token: AccessToken): void {
    this.storage.set(key, token);
  }

  private storeId(key: string, id: string): void {
    this.storage.set(key, id);
  }

  private storeUserData(userData: User): void {
    this.storage.set(this.keyUserData, userData);
  }

  private storeUserMenu(userMenu: Menu): void {
    this.storage.set(this.keyUserMenu, userMenu);
  }

  get token(): string {
    return this.storage.get(this.keyAccessToken).token;
  }

  get companyID(): string {
    return this.storage.get(this.keyCompanyId);
  }

  get userID(): string {
    return this.storage.get(this.keyUserId);
  }

  get userData(): User {
    return this.storage.get(this.keyUserData);
  }

  private get refreshToken(): string {
    return this.storage.get(this.keyAccessToken).refreshToken;
  }
}
