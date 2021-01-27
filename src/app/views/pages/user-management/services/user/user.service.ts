import { Injectable } from '@angular/core';
import { IApiService, OptionsApi, Role, User } from '@cms/core';
import { Observable } from 'rxjs';
import { IUserService } from './user.service.interface';

@Injectable()
export class UserService implements IUserService {

  constructor(
    private apiService: IApiService
    ) {}

    getAllUsers(): Observable<User[]> {
      const options = { itsAList: true } as OptionsApi;
      return this.apiService.getAll<User[]>('v1/users', options);
    }

    getUser(userID: string): Observable<User> {
      return this.apiService.get<User>(`v1/users/${userID}`);
    }

    createUser(user: User): Observable<User> {
      return this.apiService.post<User>(`v1/users`, user);
    }

    updateUser(user: User, userID: string): Observable<User> {

      const roleIds = user.roles.map((role: Role) => role.id);

      const payload = {
        ...user,
        roleIds
      } as User;

      delete payload.roles;

      return this.apiService.put<User>(`v1/users/${userID}`, payload);
    }

    deleteUser(userID: string): Observable<User> {
      return this.apiService.delete<User>(`v1/users/${userID}`);
    }


}
