import { PasswordForm } from ".";

export class User {
  id?: string;
  name = '';
  email = '';
  passwordForm = {} as PasswordForm;
  roleId = 'b0920f58-fad3-4fe5-b081-5276616f7ba6';

  constructor({ ...user }) {
    this.id = user.id,
    this.name = user.name,
    this.email = user.email,
    this.roleId = user.roleId || this.roleId
  }
}


