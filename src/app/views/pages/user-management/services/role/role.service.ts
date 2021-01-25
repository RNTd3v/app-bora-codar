import { Injectable } from '@angular/core';
import { IApiService, OptionsApi, Role } from '@cms/core';
import { Observable } from 'rxjs';
import { IRoleService } from './role.service.interface';

@Injectable()
export class RoleService implements IRoleService {

  constructor(private apiService: IApiService) { }

  getAllRoles(): Observable<Role[]> {
    const options = { itsAList: true } as OptionsApi;
    return this.apiService.getAll<Role[]>('v1/roles', options);
  }

  getRole(roleID: string): Observable<Role> {
    return this.apiService.get<Role>(`v1/roles/${roleID}`);
  }

  createRole(role: Role): Observable<Role> {
    return this.apiService.post<Role>(`v1/roles`, role);
  }

  updateRole(role: Role, roleID: string): Observable<Role> {
    return this.apiService.put<Role>(`v1/roles/${roleID}`, role);
  }

  deleteRole(roleID: string): Observable<Role> {
    return this.apiService.delete<Role>(`v1/roles/${roleID}`);
  }
}
