import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogData, IApiService, OptionsApi, Role } from '@cms/core';
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

  async handleRoleDialogs(dialogData: DialogData<any>, roleId: string = null): Promise<Role[]> {

    const wasItConfirmed = await this.dialogService.openDialog(dialogData);

    if (wasItConfirmed) {

      if (!!roleId) {
        await this.deleteRole(roleId).toPromise()
          .then(_ => this.snackBar.open('Perfil excluido com sucesso!', null, { duration: 2000}));
      }

      return await this.getAllRoles().toPromise();
    }

    Promise.resolve(null);

  }
}
