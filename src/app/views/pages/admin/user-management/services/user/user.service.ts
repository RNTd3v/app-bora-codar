import { Injectable } from '@angular/core';
import { IApiService, OptionsApi, UserStatus, User, UserChangePassword } from '@cms/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUserService } from './user.service.interface';

@Injectable()
export class UserService implements IUserService {

  private selectedUserSource = new BehaviorSubject<User | null>(null);
  selectedUserChanges$ = this.selectedUserSource.asObservable();

  constructor(
    private apiService: IApiService
    ) {}

    paginateUsers(): Observable<User[]> {
      const options = { itsAList: true } as OptionsApi;
      return this.apiService.getAll<User[]>('v1/users', options);
    }

    showUser(userID: string): Observable<User> {
      return this.apiService.get<User>(`v1/users/${userID}`);
    }

    createUser(user: User): Observable<User> {
      return this.apiService.post<User>(`v1/users`, user);
    }

    updateUser(user: User, userID: string): Observable<User> {
      console.log(user);
      console.log(userID);


      return this.apiService.put<User>(`v1/users/${userID}`, user);
    }

    updateUserPassword(userPass: UserChangePassword, userID: string): Observable<void> {
      return this.apiService.put<void>(`v1/users/${userID}/password`, userPass);
    }

    updateUserStatus(status: UserStatus, userID: string): Observable<void> {
      return this.apiService.patch<void>(`v1/users/${userID}/active`, status);
    }

    deleteUser(userID: string): Observable<User> {
      return this.apiService.delete<User>(`v1/users/${userID}`);
    }


}
