import { PasswordForm, Role } from ".";

export class User {
  id?: string;
  name: string;
  email: string;
  isActive?: boolean;
  roles?: Role[];
  password?: string;
  passwordForm?: PasswordForm;
  roleIds?: string[] = [];

  constructor({ ...user }) {
    this.id = user.id,
    this.name = user.name,
    this.email = user.email,
    this.password = user.password,
    this.roleIds = user.roleIds,
    this.isActive = user.isActive
  }
}

export interface StatusUser{
  isActive: boolean;
}

export interface UserChangePassword {
  password: string;
  newPassword: string;
  confirmPassword: string;
}


