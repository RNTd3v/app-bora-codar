import { StatusUser, User } from '@cms/core';
import { Observable } from 'rxjs';

export abstract class IUserService {

  abstract getAllUsers(): Observable<User[]>;

  abstract getUser(userID: string): Observable<User>;

  abstract createUser(user: User): Observable<User>;

  abstract updateUser(user: User, userID: string): Observable<User>;

  abstract updateStatusUser(status: StatusUser, userID: string): Observable<void>;

  abstract deleteUser(userID: string): Observable<User>;

}
