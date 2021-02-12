import { DialogData, Role } from '@cms/core';
import { Observable } from 'rxjs';

export abstract class IRoleService {

  abstract getAllRoles(): Observable<Role[]>;

  abstract getRole(roleID: string): Observable<Role>;

  abstract createRole(role: Role): Observable<Role>;

  abstract updateRole(role: Role, roleID: string): Observable<Role>;

  abstract deleteRole(roleID: string): Observable<Role>;

  abstract handleRoleDialogs(dialogData: DialogData<any>, roleId?: string): Promise<Role[]>;

}
