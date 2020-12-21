import { AccessToken, Auth, User } from "@cms/core";

export abstract class IAuthService {

  abstract login(email: string, password: string): Promise<boolean>;

  abstract logout(): void;

  abstract sessionIsValid(): Promise<boolean>;

  // abstract register(user: User): Observable<User>;

  // abstract requestPassword(email: string): Observable<any>;

  abstract get token(): string;

}
