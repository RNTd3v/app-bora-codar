import { Injectable } from '@angular/core';
import { Auth, IApiService, IAuthService, Token, User } from '@cms/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {

  constructor(private api: IApiService) { }

  login(email: string, password: string): Observable<{ userId: string }> {
    return this.api.post<Token>('v1/auth', { email, password })
      .pipe(
        tap((token: Token) => {
          if (!!token) {
            // armazena token
            return token.userId
          }
          return

        })
      )
  }

  // logout(): Promise<boolean> {}

  sessionIsValid(): boolean {
    return true;
  }

  // register(user: User): Observable<User> {}

  // requestPassword(email: string): Observable<any> {}
}
