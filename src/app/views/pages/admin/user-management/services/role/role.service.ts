import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogData, IApiService, LinkMenus, OptionsApi, Role } from '@cms/core';
import { IDialogService } from '@cms/partials';
import { Observable } from 'rxjs';
import { IRoleService } from './role.service.interface';

@Injectable()
export class RoleService implements IRoleService {

  constructor(
    private apiService: IApiService,
    private dialogService: IDialogService,
    private snackBar: MatSnackBar
    ) { }

  paginateRoles(): Observable<Role[]> {
    const options = { itsAList: true } as OptionsApi;
    return this.apiService.getAll<Role[]>('v1/roles', options);
  }

  showRole(roleID: string): Observable<Role> {
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

  linkRoleWithMenu(linkMenus: LinkMenus, roleId: string): Observable<any> {
    return this.apiService.post<any>(`v1/roles/${roleId}/menus`, linkMenus);
  }

}
