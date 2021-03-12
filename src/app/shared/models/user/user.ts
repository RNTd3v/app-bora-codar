import { PasswordForm, Role } from '.';

export class User {
  id?: string;
  name: string;
  email: string;
  avatar?: string;
  isActive?: boolean;
  roles?: Role[];
  password?: string;
  passwordForm?: PasswordForm;
  roleIds?: string[] = [];

  constructor({ ...user }) {
    this.id = user.id,
    this.name = user.name,
    this.email = user.email,
    this.avatar = user.avatar,
    this.password = user.password,
    this.roleIds = user.roleIds,
    this.isActive = user.isActive;
  }
}

export interface UserStatus {
  isActive: boolean;
}

export interface UserChangePassword {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UserDialogData {
  id?: string;
  status?: UserStatus;
  password?: UserChangePassword;
}

export enum UserDialogTarget {
  delete,
  changeStatus,
  changePassword
}


