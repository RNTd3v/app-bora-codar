import { CreateUserPayload, UpdateUserPayload, User } from '@cms/core';
import { Observable } from 'rxjs';

export abstract class IUserService {

  abstract getAllUsers(): Observable<User[]>;

  abstract getUser(userID: string): Observable<User>;

  abstract createUser(user: CreateUserPayload): Observable<User>;

  abstract updateUser(user: UpdateUserPayload, userID: string): Observable<User>;

  abstract deleteUser(userID: string): Observable<User>;

}
