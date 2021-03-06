import { DialogData, LinkMenus, Menu, Role } from '@cms/core';
import { Observable } from 'rxjs';

export abstract class IRoleService {

  abstract paginateRoles(): Observable<Role[]>;

  abstract showRole(roleID: string): Observable<Role>;

  abstract createRole(role: Role): Observable<Role>;

  abstract updateRole(role: Role, roleID: string): Observable<Role>;

  abstract deleteRole(roleID: string): Observable<Role>;

  abstract menuShowByRole(roleId: string): Observable<Menu[]>;

  abstract linkRoleWithMenu(linkMenus: LinkMenus, roleId: string): Observable<any>;

}
