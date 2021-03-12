import { UserStatus, User, UserChangePassword } from '@cms/core';
import { Observable } from 'rxjs';

export abstract class IUserService {

  abstract paginateUsers(): Observable<User[]>;

  abstract showUser(userID: string): Observable<User>;

  abstract createUser(user: User): Observable<User>;

  abstract updateUser(user: User, userID: string): Observable<User>;

  abstract updateUserPassword(userPass: UserChangePassword, userID: string): Observable<void>;

  abstract updateUserStatus(status: UserStatus, userID: string): Observable<void>;

  abstract deleteUser(userID: string): Observable<User>;

}
