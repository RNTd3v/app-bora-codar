import { Injectable } from '@angular/core';
import { CreateUserPayload, IApiService, IUserService, OptionsApi, UpdateUserPayload, User } from '@cms/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements IUserService {

  constructor(
    private apiService: IApiService
    ) {}

    getAllUsers(): Observable<User[]> {
      const options = { itsAList: true } as OptionsApi;
      return this.apiService.get<User[]>('v1/users', options);
    }

    getUser(userID: string): Observable<User> {
      return this.apiService.get<User>(`v1/users/${userID}`);
    }

    createUser(user: CreateUserPayload): Observable<User> {
      return this.apiService.post<User>(`v1/users`, user);
    }

    updateUser(user: UpdateUserPayload, userID: string): Observable<User> {
      return this.apiService.put<User>(`v1/users/${userID}`, user);
    }

    deleteUser(userID: string): Observable<User> {
      return this.apiService.delete<User>(`v1/users/${userID}`);
    }


}
