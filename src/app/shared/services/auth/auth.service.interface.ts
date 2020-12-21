import { Auth, Token, User } from "@cms/core";
import { Observable } from "rxjs";

export abstract class IAuthService {

  abstract login(email: string, password: string): Observable<{ userId: string }>;

  // abstract logout(): Promise<boolean>;

  abstract sessionIsValid(): boolean;

  // abstract register(user: User): Observable<User>;

  // abstract requestPassword(email: string): Observable<any>;

}
