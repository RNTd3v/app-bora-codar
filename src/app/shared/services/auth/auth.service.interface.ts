import { AccessToken, Auth, Menu, User } from '@cms/core';
import { Observable } from 'rxjs';

export abstract class IAuthService {

  abstract login(email: string, password: string): Promise<boolean>;

  abstract logout(): void;

  abstract registerUser(user: User): Observable<User>;

  abstract sessionIsValid(): Promise<boolean>;

  // abstract register(user: User): Observable<User>;

  // abstract requestPassword(email: string): Observable<any>;

  abstract getUserMenu(): Menu[];

  abstract get token(): string;

  abstract get companyID(): string;

  abstract get userID(): string;

  abstract get userData(): User;


}
