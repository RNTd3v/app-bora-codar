export class Role {
  id?: string;
  name: string;
  admin: boolean;

  constructor({ ...role }) {
    this.id = role.id,
    this.name = role.name,
    this.admin = role.admin;
  }
}

export interface RoleDialogData {
  id?: string;
}

export type RoleMenusPermissions = {
  menuIndex: number,
  value: boolean,
  submenuIndex?: number | null,
  actionIndex?: number | null
}

export enum RoleDialogTarget {
  delete
}
