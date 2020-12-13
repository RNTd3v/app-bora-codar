import { Auth, PasswordForm } from ".";

export interface User {
  id: string;
  name: string;
  fullname: string;
  email: string;
  roleId: string;
}

export interface CreateUserPayload extends Auth {
  name: string;
  roleId: string;
}

export interface UpdateUserPayload {
  fullname: string;
  email: string;
  passwordForm: PasswordForm;
  roleId: string;
}

