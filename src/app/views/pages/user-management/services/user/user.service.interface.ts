import { DialogData, DialogTarget, StatusUser, User, UserChangePassword, UserDialogData, UserDialogTarget } from '@cms/core';
import { Observable } from 'rxjs';

export abstract class IUserService {

  abstract getAllUsers(): Observable<User[]>;

  abstract getUser(userID: string): Observable<User>;

  abstract createUser(user: User): Observable<User>;

  abstract updateUser(user: User, userID: string): Observable<User>;

  abstract updateUserPassword(userPass: UserChangePassword, userID: string): Observable<void>;

  abstract updateStatusUser(status: StatusUser, userID: string): Observable<void>;

  abstract deleteUser(userID: string): Observable<User>;

  abstract handleUserDialogs(dialogData: DialogData<any>, target?: DialogTarget<UserDialogData, UserDialogTarget>): Promise<User[]>;

}